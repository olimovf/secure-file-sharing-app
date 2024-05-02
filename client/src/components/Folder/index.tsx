import { useState } from 'react';
import {
	Card,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	ListItemIcon,
	Checkbox,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { StyledCardContent, StyledCardMedia } from './style';

type FolderProps = {
	name: string;
	size?: string;
};

const Folder = ({ name }: FolderProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAction = (action: string) => {
		console.log(`Performing action: ${action}`);
		handleClose();
	};

	return (
		<Card sx={{ p: 1.5 }}>
			<StyledCardMedia>
				<FolderIcon sx={{ fontSize: 96 }} color='primary' />
				<Checkbox size='small' sx={{ position: 'absolute', top: 0, left: 0 }} />
				<IconButton
					aria-label='folder-actions'
					aria-controls='folder-actions-menu'
					aria-haspopup='true'
					onClick={handleClick}
					size='small'
					sx={{ position: 'absolute', top: 0, right: 0 }}
				>
					<MoreVertIcon />
				</IconButton>
			</StyledCardMedia>
			<StyledCardContent>
				<Typography variant='body1' component='div'>
					{name}
				</Typography>
				{/* <Typography variant='body2' color='secondary'>
					{size}
				</Typography> */}
			</StyledCardContent>
			<Menu
				id='folder-actions-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleAction('select')}>
					<ListItemIcon>
						<CheckIcon fontSize='small' />
					</ListItemIcon>
					<Typography variant='inherit'>Select</Typography>
				</MenuItem>

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
