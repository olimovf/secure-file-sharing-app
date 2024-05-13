// import HomeIcon from '@mui/icons-material/Home';
// import FolderIcon from '@mui/icons-material/Folder';
import SharedByMeIcon from '@mui/icons-material/FileUpload';
import SharedWithMeIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import HistoryIcon from '@mui/icons-material/History';
// import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SearchIcon from '@mui/icons-material/Search';
// import HelpIcon from '@mui/icons-material/Help';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LogoutIcon from '@mui/icons-material/Logout';
import UsersIcon from '@mui/icons-material/People';

export const navLinks = [
	{
		name: 'Share files',
		to: '/dashboard',
		icon: <ShareIcon />,
	},
	// {
	// 	name: 'My Files',
	// 	to: '/dashboard/files',
	// 	icon: <FolderIcon />,
	// },
	{
		name: 'Users',
		to: '/dashboard/users',
		icon: <UsersIcon />,
	},
	{
		name: 'Shared by Me',
		to: '/dashboard/shared-by-me',
		icon: <SharedByMeIcon />,
	},
	{
		name: 'Shared with Me',
		to: '/dashboard/shared-with-me',
		icon: <SharedWithMeIcon />,
	},
	{
		name: 'Profile',
		to: '/dashboard/profile',
		icon: <PersonIcon />,
	},
	{
		name: 'Activity',
		// to: '/dashboard/activity',
		icon: <HistoryIcon />,
	},
	// {
	// 	name: 'Settings',
	// 	to: '/dashboard/settings',
	// 	icon: <SettingsIcon />,
	// },
	{
		name: 'VirusTotal',
		// to: '/dashboard/virustotal',
		icon: <CoronavirusIcon />,
	},
	{
		name: 'Logout',
		to: '/dashboard/logout',
		icon: <LogoutIcon />,
	},
	// {
	// 	name: 'Share',
	// 	to: '/dashboard/share',
	// 	icon: <ShareIcon />,
	// },
	// {
	// 	name: 'Notifications',
	// 	to: '/dashboard/notifications',
	// 	icon: <NotificationsIcon />,
	// },
	// {
	// 	name: 'Search',
	// 	to: '/dashboard/search',
	// 	icon: <SearchIcon />,
	// },
	// {
	// 	name: 'Help',
	// 	to: '/dashboard/help',
	// 	icon: <HelpIcon />,
	// },
];
