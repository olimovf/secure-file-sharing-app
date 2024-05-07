import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer, DrawerHeader, Main } from './style';
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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const Dashboard = () => {
	const [sendLogout] = useSendLogoutMutation();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await sendLogout({}).unwrap();
		navigate('/login');
	};

	const [open, setOpen] = useState(true);
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
	const { roles } = useAuth();

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
					{navLinks.map(({ name, to, icon }) => {
						const txt = (
							<>
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
							</>
						);

						if (name === 'Logout') {
							return (
								<ListItem key={name} disablePadding sx={{ display: 'block' }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
										onClick={handleLogout}
									>
										{txt}
									</ListItemButton>
								</ListItem>
							);
						}

						if (!to) {
							return (
								<ListItem key={name} disablePadding sx={{ display: 'block' }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}
									>
										{txt}
									</ListItemButton>
								</ListItem>
							);
						}

						if (name === 'Users') {
							if (roles.includes(ROLES.admin)) {
								return (
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
											{txt}
										</ListItemButton>
									</ListItem>
								);
							} else return;
						}

						return (
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
									{txt}
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Drawer>
			<Main
				sx={{
					width: open ? 'calc(100% - 250px)' : '100%',
				}}
			>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
};

export default Dashboard;
