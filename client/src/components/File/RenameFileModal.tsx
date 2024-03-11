import {
	Button,
	DialogTitle,
	OutlinedInput,
	FormControl,
	InputAdornment,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDialog } from './style';
import { useUpdateFileMutation } from '../../features/file/fileApiSlice';

type RenameFileModalProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	newName: string;
	setNewName: (name: string) => void;
	fileType: string;
	fileId: string;
};

const RenameFileModal = ({
	open,
	setOpen,
	newName,
	setNewName,
	fileType,
	fileId,
}: RenameFileModalProps) => {
	const [updateFile, { isLoading }] = useUpdateFileMutation<MutationType>();

	const handleClose = () => {
		setOpen(false);
	};

	const onSave = async () => {
		await updateFile({ id: fileId, name: newName.trim() }).unwrap();
		handleClose();
	};

	return (
		<StyledDialog
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={open}
		>
			<DialogTitle sx={{ m: 0, px: 2, py: 1.5 }}>Rename a file</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 12,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
				size='small'
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers sx={{ padding: '12px !important' }}>
				<FormControl sx={{ m: 1, width: 320 }} variant='outlined'>
					<Typography
						component={'label'}
						htmlFor='outlined-adornment-weight'
						fontSize={'16px'}
						mb={1}
					>
						New name
					</Typography>
					<OutlinedInput
						id='outlined-adornment-weight'
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						endAdornment={
							<InputAdornment position='end'>{fileType}</InputAdornment>
						}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions sx={{ padding: '12px !important' }}>
				<Button
					autoFocus
					onClick={onSave}
					size='small'
					disabled={!newName.trim() || isLoading}
				>
					Save
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default RenameFileModal;
