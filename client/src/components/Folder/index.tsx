import { useState } from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	ListItemIcon,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type FolderProps = {
	name: string;
	size: string;
};

const Folder = ({ name, size }: FolderProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAction = (action: string) => {
		// Implement action logic here
		console.log(`Performing action: ${action}`);
		handleClose();
	};

	return (
		<Card sx={{ p: 1.5 }}>
			<CardMedia
				component='div'
				sx={{
					height: 140,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					cursor: 'pointer',
				}}
			>
				<FolderIcon sx={{ fontSize: 96 }} color='primary' />
				<IconButton
					aria-label='folder-actions'
					aria-controls='folder-actions-menu'
					aria-haspopup='true'
					onClick={handleClick}
					sx={{ position: 'absolute', top: 0, right: 0 }}
				>
					<MoreVertIcon />
				</IconButton>
			</CardMedia>
			<CardContent
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 !important',
				}}
			>
				<Typography variant='body1' component='div'>
					{name}
				</Typography>
				<Typography variant='body2' color='secondary'>
					{size}
				</Typography>
			</CardContent>
			<Menu
				id='folder-actions-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleAction('download')}>
					<ListItemIcon>
						<DownloadIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Download</Typography>
				</MenuItem>
				<MenuItem onClick={() => handleAction('share')}>
					<ListItemIcon>
						<ShareIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Share</Typography>
				</MenuItem>
				<MenuItem onClick={() => handleAction('rename')}>
					<ListItemIcon>
						<EditIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Rename</Typography>
				</MenuItem>
				<MenuItem onClick={() => handleAction('delete')}>
					<ListItemIcon>
						<DeleteIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Delete</Typography>
				</MenuItem>
			</Menu>
		</Card>
	);
};

export default Folder;
