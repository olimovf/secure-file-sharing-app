// import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import TopBarProgress from 'react-topbar-progress-indicator';

const Layout = () => {
	// const [progress, setProgress] = useState(false);
	// const [prevLoc, setPrevLoc] = useState('');
	// const location = useLocation();

	// useEffect(() => {
	// 	setPrevLoc(location.pathname);
	// 	setProgress(true);
	// 	if (location.pathname === prevLoc) {
	// 		setPrevLoc('');
	// 	}
	// }, [location]);

	// useEffect(() => {
	// 	setProgress(false);
	// }, [prevLoc]);

	return (
		// <>
		// {progress && <TopBarProgress />}
		<Outlet />
		// </>
	);
};

export default Layout;
