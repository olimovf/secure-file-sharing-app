import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Users from './pages/Users';
import EditUser from './pages/Users/EditUser';
import { ROLES } from './utils/constants';
import NewUser from './pages/Users/NewUser';
import Profile from './pages/Profile';
import Verification from './pages/Verification';
import SharedByMe from './pages/SharedByMe';
import SharedWithMe from './pages/SharedWithMe';
import Activity from './pages/Activity';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />

				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
						<Route path='dashboard' element={<Dashboard />}>
							<Route index element={<Home />} />
							<Route path='users'>
								<Route index element={<Users />} />
								<Route path=':id' element={<EditUser />} />
								<Route path='new' element={<NewUser />} />
							</Route>
							<Route path='profile' element={<Profile />} />
							<Route path='shared-by-me' element={<SharedByMe />} />
							<Route path='shared-with-me' element={<SharedWithMe />} />
							<Route path='activity' element={<Activity />} />
						</Route>
					</Route>
				</Route>

				<Route path='users/verify/:userId/:token' element={<Verification />} />
			</Route>
		</Routes>
	);
};

export default App;
