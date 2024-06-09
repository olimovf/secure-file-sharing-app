import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Divider,
	useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from '../../features/users/usersApiSlice';
import { loadColumns } from './configureUserTableCols';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import notify from '../../utils/notify';
import { PulseLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Users = () => {
	useTitle('Users list');
	const { id } = useAuth();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery(
		'usersList',
		{},
	);
	const rows = users?.map((user: UserType, index: number) => ({
		id: user._id,
		tr: index + 1,
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.email,
		roles: user?.roles.join(', '),
		verified: user?.verified,
	}));
	const [deleteUser, { isLoading: deleteUserLoading }] =
		useDeleteUserMutation<MutationType>();

	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>('');

	const onEdit = (id: string) => {
		navigate(`/dashboard/users/${id}`);
	};

	const onDelete = (id: string) => {
		setOpen(true);
		setUserId(id);
	};

	const handleDeleteConfirm = async () => {
		await deleteUser({ id: userId })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
		setOpen(false);
		if (id === userId) {
			navigate('/login');
		}
	};

	const handleDeleteCancel = () => {
		setOpen(false);
	};

	const theme = useTheme();

	return (
		<>
			<Box display={'flex'} justifyContent={'space-between'} gap={2}>
				<Typography variant='h4'>Users</Typography>
				{/* <Button size='small' component={Link} to='/dashboard/users/new'>
					Add new user
				</Button> */}
			</Box>

			<Box
				sx={{
					width: '100%',
					overflowX: 'none',
					mt: 2,
					[theme.breakpoints.down('md')]: {
						overflowX: 'scroll',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					},
				}}
			>
				{usersLoading ? (
					<PulseLoader color={theme.palette.primary.main} />
				) : (
					<DataGrid
						rows={rows || []}
						columns={loadColumns(onDelete, onEdit)}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						disableRowSelectionOnClick
						sx={{
							width: '100%',
							[theme.breakpoints.down('md')]: {
								width: 750,
							},
							border: `1px solid ${theme.palette.info.dark}`,
							'& .MuiDataGrid-row': {
								borderBottom: `1px solid ${theme.palette.info.dark}`,
								'&:first-of-type': {
									borderTop: `1px solid ${theme.palette.info.dark}`,
								},
							},
							'& .MuiDataGrid-cell': {
								borderTop: 0,
								bordetBottom: 0,

								'&:focus': {
									outlineColor: theme.palette.info.dark,
								},
							},
							'& .MuiDataGrid-footerContainer': {
								borderTop: 0,
								bordetBottom: 0,
							},
							'& .MuiDataGrid-topContainer': {
								borderBottom: 0,
							},
							'& .MuiDataGrid-topContainer::after': {
								height: 0,
							},
						}}
					/>
				)}
			</Box>

			<Dialog open={open} onClose={handleDeleteCancel}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					Are you sure you want to delete this user? Anything <br /> associated
					with this account will also be deleted!
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						onClick={handleDeleteCancel}
						size='small'
						disabled={deleteUserLoading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleDeleteConfirm}
						color='error'
						size='small'
						disabled={deleteUserLoading}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Users;
