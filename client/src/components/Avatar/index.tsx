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
import useAuth from '../../hooks/useAuth';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';

const Avatar = () => {
	const { id, roles } = useAuth();
	const { user }: { user: UserType } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.find((user: UserType) => user._id === id),
		}),
	});

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

	const goToProfile = () => {
		handleClose();
		navigate('/dashboard/profile');
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
					<StyledAvatar>{`${user?.firstName?.[0]}${user?.lastName?.[0]}`}</StyledAvatar>
				</IconButton>
				<Typography variant='subtitle1'>{user?.firstName}</Typography>
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
				<MenuItem onClick={goToProfile}>
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
