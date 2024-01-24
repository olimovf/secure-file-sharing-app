import { styled, Menu, Avatar, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export const StyledMenu = styled(Menu)(({ theme }) => ({
	'& .MuiPaper-root': {
		width: 150,
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		marginTop: theme.spacing(1.5),
		'& .MuiAvatar-root': {
			padding: 0,
			width: 32,
			height: 32,
			marginLeft: -0.5,
			marginRight: 1,
			backgroundColor: theme.palette.background.default,
		},
		'&::before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 20,
			width: 10,
			height: 10,
			backgroundColor: theme.palette.background.paper,
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,
		},
	},
}));

export const StyledAvatar = styled(Avatar)(() => ({
	fontSize: 18,
	backgroundColor: deepOrange[500],
}));

export const AvatarWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(1),
}));
