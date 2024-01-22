import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer, DrawerHeader } from './style';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { navLinks } from './navLinks';
import { Link, Outlet } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Dashboard = () => {
	const [open, setOpen] = useState(true);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	useEffect(() => {
		if (matches) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [matches]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position='fixed' open={open}>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: open ? 'flex-end' : 'space-between',
						alignItems: 'center',
					}}
				>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							mr: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Avatar />
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader>
					<Typography variant='h6' noWrap component='div'>
						Secure File Sharing
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List sx={{ py: 0 }}>
					{navLinks.map(({ name, to, icon }) => (
						<ListItem key={name} disablePadding sx={{ display: 'block' }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
								component={Link}
								to={to}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									{icon}
								</ListItemIcon>
								<ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Dashboard;
