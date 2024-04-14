import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';

type RowsType = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	roles: string[];
};

const columns: GridColDef<RowsType>[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 90,
	},
	{
		field: 'firstName',
		headerName: 'First name',
		flex: 1,
		editable: false,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		flex: 1,
		editable: false,
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 1,
		editable: false,
	},
	{
		field: 'roles',
		headerName: 'Roles',
		flex: 1,
		editable: false,
	},
	{
		field: 'actions',
		type: 'actions',
		headerName: 'Actions',
		flex: 1,
		cellClassName: 'actions',
		getActions: () => {
			return [
				<GridActionsCellItem
					icon={<EditIcon />}
					label='Edit'
					className='textPrimary'
					// onClick={handleEditClick(id)}
					color='inherit'
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label='Delete'
					// onClick={handleDeleteClick(id)}
					color='inherit'
				/>,
			];
		},
	},
];

const Users = () => {
	const { data: users } = useGetUsersQuery('usersList', {});
	const rows = users?.map((user: UserType, index: number) => ({
		id: index + 1,
		firstName: user?.firstName,
		lastName: user?.lastName,
		email: user?.email,
		roles: user?.roles.join(', '),
	}));

	return (
		<>
			<Typography variant='h4'>Users</Typography>

			<Box sx={{ width: '100%', mt: 2 }}>
				<DataGrid
					rows={rows || []}
					columns={columns}
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
		</>
	);
};

export default Users;
