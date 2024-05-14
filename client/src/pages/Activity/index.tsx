import { Box, Typography, useTheme } from '@mui/material';
import { useGetActivitiesQuery } from '../../features/activity/activityApiSlice';
import { PulseLoader } from 'react-spinners';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
	const { data: acts, isLoading: actsLoading } = useGetActivitiesQuery(
		'activityList',
		{},
	);

	const rows = acts?.map((act: ActivityType, index: number) => ({
		id: act._id,
		tr: index + 1,
		ip: act?.ip,
		action: act?.action,
		status: act?.status,
		createdAt: act.createdAt,
	}));

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

	const theme = useTheme();

	return (
		<Box>
			<Typography variant='h4'>Activity</Typography>

			{actsLoading ? (
				<PulseLoader color={theme.palette.primary.main} />
			) : (
				<Box sx={{ width: '100%', mt: 2 }}>
					<DataGrid
						rows={rows || []}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[10]}
						disableRowSelectionOnClick
					/>
				</Box>
			)}
		</Box>
	);
};

export default Activity;
