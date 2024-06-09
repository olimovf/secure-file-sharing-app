import { Box, Typography, useTheme } from '@mui/material';
import { useGetActivitiesQuery } from '../../features/activity/activityApiSlice';
import { PulseLoader } from 'react-spinners';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import useTitle from '../../hooks/useTitle';
dayjs.extend(utc);

type RowsType = {
	tr: number;
	id: string;
	ip: string;
	action: string;
	status: string;
	createdAt: string;
};

const Activity = () => {
	useTitle('Activity');
	const { data: acts, isLoading: actsLoading } = useGetActivitiesQuery(
		'activityList',
		{},
	);
	const { data: users } = useGetUsersQuery('usersList', {});
	const { roles } = useAuth();

	const rows = acts?.map((act: ActivityType, index: number) => {
		const obj = {
			id: act._id,
			tr: index + 1,
			ip: act?.ip,
			action: act?.action,
			status: act?.status,
			createdAt: act.createdAt,
		};

		if (roles.includes(ROLES.admin)) {
			return {
				...obj,
				user: users?.find((user: UserType) => user._id === act.userId)
					?.firstName,
			};
		}

		return obj;
	});

	const columns: GridColDef<RowsType>[] = [
		{
			field: 'tr',
			headerName: 'T/r',
			width: 90,
		},
		{
			field: 'ip',
			headerName: 'IP address',
			flex: 1,
			editable: false,
		},
		{
			field: 'action',
			headerName: 'Action',
			flex: 1,
			editable: false,
		},
		{
			field: 'status',
			headerName: 'Status',
			flex: 0.8,
			editable: false,
		},
		{
			field: 'createdAt',
			headerName: 'Date',
			flex: 1,
			editable: false,
			renderCell(params) {
				return dayjs(params.row.createdAt)
					.utc(true)
					.format('DD.MM.YYYY HH:mm:ss');
			},
		},
	];

	if (roles.includes(ROLES.admin)) {
		columns.splice(1, 0, {
			field: 'user',
			headerName: 'User',
			flex: 1,
			editable: false,
		});
	}

	const theme = useTheme();

	return (
		<Box>
			<Typography variant='h4'>Activity</Typography>

			<Box
				sx={{
					width: '100%',
					overflowX: 'none',
					mt: 2,
					[theme.breakpoints.down('md')]: {
						overflowX: 'auto',
						'&::-webkit-scrollbar': {
							display: 'none',
						},
					},
				}}
			>
				{actsLoading ? (
					<PulseLoader color={theme.palette.primary.main} />
				) : (
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
		</Box>
	);
};

export default Activity;
