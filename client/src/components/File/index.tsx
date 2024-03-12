import { useState } from 'react';
import {
	Card,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	ListItemIcon,
} from '@mui/material';
import FileIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FileName, StyledCardContent, StyledCardMedia } from './style';
import {
	useDeleteFileMutation,
	useDownloadFileMutation,
} from '../../features/file/fileApiSlice';
import RenameFileModal from './RenameFileModal';
import notify from '../../utils/notify';

const File = ({ _id, name }: FileType) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [fileState, setFileState] = useState<{
		isRenaming: boolean;
		newName: string;
	}>({ isRenaming: false, newName: name.slice(0, name.lastIndexOf('.')) });

	const [deleteFile] = useDeleteFileMutation<MutationType>();
	const [downloadFile] = useDownloadFileMutation<MutationType>();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteFile = async () => {
		handleClose();
		await deleteFile({ id: _id })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
	};

	const handleDownloadFile = async () => {
		handleClose();
		await downloadFile({ id: _id, name })
			.unwrap()
			.then(() => {
				notify('File downloaded successfully', 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
	};

	const handleRenameFile = () => {
		handleClose();
		setFileState({ ...fileState, isRenaming: true });
	};

	return (
		<Card sx={{ p: 1.5 }}>
			<StyledCardMedia>
				<FileIcon sx={{ fontSize: 96 }} color='primary' />
				<IconButton
					aria-label='file-actions'
					aria-controls='file-actions-menu'
					aria-haspopup='true'
					onClick={handleClick}
					sx={{ position: 'absolute', top: 0, right: 0 }}
				>
					<MoreVertIcon />
				</IconButton>
			</StyledCardMedia>
			<StyledCardContent>
				<FileName variant='body1'>{name}</FileName>
				{/* <Typography variant='body2' color='secondary'>
					{size}
				</Typography> */}
			</StyledCardContent>
			<Menu
				id='file-actions-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleDownloadFile}>
					<ListItemIcon>
						<DownloadIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Download</Typography>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<ShareIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Share</Typography>
				</MenuItem>
				<MenuItem onClick={handleRenameFile}>
					<ListItemIcon>
						<EditIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Rename</Typography>
				</MenuItem>
				<MenuItem onClick={handleDeleteFile}>
					<ListItemIcon>
						<DeleteIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Delete</Typography>
				</MenuItem>
			</Menu>
			<RenameFileModal
				fileId={_id}
				fileType={name.slice(name.lastIndexOf('.'))}
				fileState={fileState}
				setFileState={setFileState}
			/>
		</Card>
	);
};

export default File;
