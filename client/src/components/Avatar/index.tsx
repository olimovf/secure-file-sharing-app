import React, { useState } from 'react';
import {
	IconButton,
	ListItemIcon,
	Typography,
	Box,
	MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { AvatarWrapper, StyledAvatar, StyledMenu } from './style';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';

const Avatar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [sendLogout] = useSendLogoutMutation();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await sendLogout({}).unwrap();
		navigate('/login');
		handleClose();
	};

	return (
		<>
			<AvatarWrapper>
				<IconButton
					onClick={handleClick}
					size='small'
					aria-controls={open ? 'account-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
				>
					<StyledAvatar>FO</StyledAvatar>
				</IconButton>
				<Typography variant='subtitle1'>Fayozbek</Typography>
			</AvatarWrapper>
			<StyledMenu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				PaperProps={{ elevation: 0 }}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonIcon fontSize='small' />
					</ListItemIcon>
					Profile
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</StyledMenu>
		</>
	);
};

export default Avatar;
