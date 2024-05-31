import {
	DialogTitle,
	DialogContent,
	IconButton,
	Box,
	ListItemText,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledDialog } from './style';
import { useGetFilesQuery } from '../../features/file/fileApiSlice';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatBytes } from '../../utils';
import useAuth from '../../hooks/useAuth';
dayjs.extend(utc);

type InfoFileModalProps = {
	fileId: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoFileModal = ({ fileId, open, setOpen }: InfoFileModalProps) => {
	const { file }: { file: FileType } = useGetFilesQuery('filesList', {
		selectFromResult: ({ data }) => ({
			file: data?.find((file: FileType) => file._id === fileId),
		}),
	});

	const { data: users } = useGetUsersQuery('usersList', {});

	const { id } = useAuth();

	const sharedBy =
		file.sharedBy === id
			? 'You'
			: users?.find((user: UserType) => user._id === file.sharedBy)?.firstName;
	const sharedWith =
		file.sharedWith === id
			? 'You'
			: users?.find((user: UserType) => user._id === file.sharedWith)
					?.firstName;
	const createdAt = dayjs(file.createdAt).utc(true).format('DD.MM.YYYY HH:mm');
	const size = formatBytes(file.size);

	const info = {
		Size: size,
		'Shared by': sharedBy,
		'Shared with': sharedWith,
		'Sent time': createdAt,
	};

	return (
		<StyledDialog onClose={() => setOpen(false)} open={open}>
			<DialogTitle sx={{ m: 0, px: 2, py: 1.5 }}>File info</DialogTitle>
			<IconButton
				aria-label='close'
				onClick={() => setOpen(false)}
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
			<DialogContent
				dividers
				sx={{
					padding: '12px !important',
					maxWidth: '100%',
					width: 360,
				}}
			>
				{Object.entries(info).map((entry, i) => (
					<Box
						key={i}
						display={'flex'}
						justifyContent={'space-between'}
						gap={1}
						px={1}
						py={0.5}
						alignItems={'center'}
					>
						<ListItemText>{entry[0]}</ListItemText>
						<Typography variant='body2' color='text.secondary'>
							{entry[1]}
						</Typography>
					</Box>
				))}
			</DialogContent>
		</StyledDialog>
	);
};

export default InfoFileModal;
