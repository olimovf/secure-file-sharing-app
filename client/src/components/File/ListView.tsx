import {
	Avatar,
	Box,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material';
import { fileIcons, formatBytes } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import {
	useDeleteFileMutation,
	useDownloadFileMutation,
} from '../../features/file/fileApiSlice';
import notify from '../../utils/notify';
import RenameFileModal from './RenameFileModal';
import InfoFileModal from './InfoFileModal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
dayjs.extend(utc);

const ListView = ({
	file: { _id, name, size, sharedBy, sharedWith, createdAt },
	isSharedBy = false,
}: {
	file: FileType;
	isSharedBy?: boolean;
}) => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [fileState, setFileState] = useState<{
		isRenaming: boolean;
		newName: string;
	}>({ isRenaming: false, newName: name.slice(0, name.lastIndexOf('.')) });
	const [isInfoFileOpen, setIsInfoFileOpen] = useState<boolean>(false);

	useEffect(() => {
		setFileState({
			isRenaming: false,
			newName: name.slice(0, name.lastIndexOf('.')),
		});
	}, [_id, name]);

	const [deleteFile] = useDeleteFileMutation<MutationType>();
	const [downloadFile] = useDownloadFileMutation<MutationType>();
	const { data: users } = useGetUsersQuery('usersList', {});

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
				if (err.status === 404) {
					notify('File not found on server', 'error');
				} else {
					notify(err?.data?.message || err?.message, 'error');
				}
			});
	};

	const handleRenameFile = () => {
		handleClose();
		setFileState({ ...fileState, isRenaming: true });
	};

	const handleInfoFile = () => {
		handleClose();
		setIsInfoFileOpen(true);
	};

	return (
		<Grid item xs={12}>
			<Box
				bgcolor={theme.palette.secondary.main}
				borderRadius={1}
				py={1}
				px={1.5}
				display={'grid'}
				gridTemplateColumns={'2fr 1fr 1fr 0.6fr 60px'}
				alignItems={'center'}
				position={'relative'}
				sx={{
					[theme.breakpoints.down('md')]: {
						gridTemplateColumns: 'auto 60px',
					},
				}}
			>
				<Box display={'flex'} gap={1} alignItems={'center'}>
					<Avatar sx={{ bgcolor: theme.palette.primary.main }}>
						<FontAwesomeIcon
							icon={fileIcons(name.slice(name.lastIndexOf('.')))}
						/>
					</Avatar>
					<Typography>{name}</Typography>
				</Box>

				<Box
					sx={{
						[theme.breakpoints.down('md')]: {
							display: 'none',
						},
					}}
				>
					<Typography textAlign={'right'} ml={1}>
						{isSharedBy
							? users?.find((user: UserType) => user._id === sharedBy)
									?.firstName
							: users?.find((user: UserType) => user._id === sharedWith)
									?.firstName}
					</Typography>
				</Box>
				<Box
					sx={{
						[theme.breakpoints.down('md')]: {
							display: 'none',
						},
					}}
				>
					<Typography textAlign={'right'} ml={1}>
						{dayjs(createdAt).utc(true).format('DD.MM.YYYY HH:mm')}
					</Typography>
				</Box>
				<Box
					sx={{
						[theme.breakpoints.down('md')]: {
							display: 'none',
						},
					}}
				>
					<Typography textAlign={'right'} ml={1}>
						{formatBytes(size)}
					</Typography>
				</Box>
				<Box textAlign={'right'} ml={1}>
					<IconButton
						aria-label='file-actions'
						aria-controls='file-actions-menu'
						aria-haspopup='true'
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>
				</Box>
			</Box>
			<Menu
				id='file-actions-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleInfoFile} sx={{ minHeight: 36 }}>
					<ListItemIcon>
						<InfoIcon fontSize='small' sx={{ color: '' }} />
					</ListItemIcon>
					<Typography variant='inherit'>Info</Typography>
				</MenuItem>
				<MenuItem onClick={handleDownloadFile} sx={{ minHeight: 36 }}>
					<ListItemIcon>
						<DownloadIcon fontSize='small' sx={{ color: '' }} />
					</ListItemIcon>
					<Typography variant='inherit'>Download</Typography>
				</MenuItem>
				<MenuItem onClick={handleRenameFile} sx={{ minHeight: 36 }}>
					<ListItemIcon>
						<EditIcon fontSize='small' sx={{ color: '' }} />
					</ListItemIcon>
					<Typography variant='inherit'>Rename</Typography>
				</MenuItem>
				<MenuItem onClick={handleDeleteFile} sx={{ minHeight: 36 }}>
					<ListItemIcon>
						<DeleteIcon fontSize='small' sx={{ color: '' }} />
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
			<InfoFileModal
				open={isInfoFileOpen}
				setOpen={setIsInfoFileOpen}
				fileId={_id}
			/>
		</Grid>
	);
};

export default ListView;
