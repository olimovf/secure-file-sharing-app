import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, BoxProps, Paper, PaperProps } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: theme.spacing(0, 1.5),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		zIndex: theme.zIndex.drawer - 1,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface PProps extends PaperProps {
	open?: boolean;
}

export const BottomBar = styled(Paper, {
	shouldForwardProp: (prop) => prop !== 'open',
})<PProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	position: 'fixed',
	bottom: 0,
	left: 0,
	right: 0,
	borderRadius: 0,
	padding: theme.spacing(2),
	marginLeft: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		marginLeft: open ? `${drawerWidth}px` : `calc(${theme.spacing(8)} + 1px)`,
	},
	...(open && {
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

// export const Main = styled((props: BoxProps) => (
// 	<Box component={'main'} {...props} />
// ))(({ theme }) => ({
// 	width: `calc(100% - ${drawerWidth}px)`,
// 	flexGrow: theme.spacing(1),
// 	padding: theme.spacing(3),
// }));

interface BProps extends BoxProps {
	open?: boolean;
}

export const Main = styled(
	(props: BProps) => <Box component={'main'} {...props} />,
	{
		shouldForwardProp: (prop) => prop !== 'open',
	},
)(({ theme, open }) => ({
	width: '100%',
	flexGrow: theme.spacing(1),
	padding: theme.spacing(3),
	overflowX: 'auto',
	transition: theme.transitions.create(['width'], {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width'], {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));
