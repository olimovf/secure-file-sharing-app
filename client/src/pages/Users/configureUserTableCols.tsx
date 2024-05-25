import {
	GridColDef,
	GridRenderCellParams,
	GridRowParams,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { GridActionsCellItem } from '@mui/x-data-grid';

type RowsType = {
	tr: number;
	id: string;
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	roles: string[];
	verified?: boolean;
};

export const loadColumns = (
	onDelete: (id: string) => void,
	onEdit: (id: string) => void,
) => {
	const columns: GridColDef<RowsType>[] = [
		{
			field: 'tr',
			headerName: 'T/r',
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
			field: 'verified',
			headerName: 'Verified',
			width: 110,
			editable: false,
			renderCell: (params: GridRenderCellParams<UserType>) => {
				return params.row.verified ? (
					<DoneIcon sx={{ mt: 1, color: 'success.main' }} />
				) : (
					<CloseIcon sx={{ mt: 1, color: 'error.main' }} />
				);
			},
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			flex: 1,
			cellClassName: 'actions',
			getActions: (params: GridRowParams) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon color='info' />}
						label='Edit'
						color='inherit'
						onClick={() => onEdit(params.row.id)}
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon color='error' />}
						label='Delete'
						color='inherit'
						onClick={() => onDelete(params.row.id)}
					/>,
				];
			},
		},
	];

	return columns;
};
