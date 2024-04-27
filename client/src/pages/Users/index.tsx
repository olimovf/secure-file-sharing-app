import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Divider,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from '../../features/users/usersApiSlice';
import { loadColumns } from './configureUserTableCols';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import notify from '../../utils/notify';

const Users = () => {
	const { data: users } = useGetUsersQuery('usersList', {});
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
	};

	const handleDeleteCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<Box display={'flex'} justifyContent={'space-between'} gap={2}>
				<Typography variant='h4'>Users</Typography>
				<Button size='small' component={Link} to='/dashboard/users/new'>
					Add new user
				</Button>
			</Box>

			<Box sx={{ width: '100%', mt: 2 }}>
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
				/>
			</Box>

			<Dialog open={open} onClose={handleDeleteCancel}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					Are you sure you want to delete this user?
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
