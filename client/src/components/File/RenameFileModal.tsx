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
import notify from '../../utils/notify';

type RenameFileModalProps = {
	fileId: string;
	fileType: string;
	fileState: { isRenaming: boolean; newName: string };
	setFileState: React.Dispatch<
		React.SetStateAction<{ isRenaming: boolean; newName: string }>
	>;
};

const RenameFileModal = ({
	fileId,
	fileType,
	fileState,
	setFileState,
}: RenameFileModalProps) => {
	const [updateFile, { isLoading }] = useUpdateFileMutation<MutationType>();

	const handleClose = () => {
		setFileState({ ...fileState, isRenaming: false });
	};

	const onSave = async () => {
		await updateFile({ id: fileId, name: fileState.newName.trim() })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			})
			.finally(() => {
				handleClose();
			});
	};

	const canSave = isLoading || !fileState.newName.trim();

	return (
		<StyledDialog onClose={handleClose} open={fileState.isRenaming}>
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
				<FormControl
					sx={{ p: 1, width: 320, maxWidth: '100%' }}
					variant='outlined'
				>
					<Typography
						component={'label'}
						htmlFor='newName'
						fontSize={'16px'}
						mb={1}
					>
						New file name
					</Typography>
					<OutlinedInput
						id='newName'
						value={fileState.newName}
						onChange={(e) =>
							setFileState({ ...fileState, newName: e.target.value })
						}
						endAdornment={
							<InputAdornment position='end'>{fileType}</InputAdornment>
						}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions sx={{ padding: '12px !important' }}>
				<Button autoFocus onClick={onSave} size='small' disabled={canSave}>
					Save
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default RenameFileModal;
