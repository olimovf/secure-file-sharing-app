import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Files from './pages/Files';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Users from './pages/Users';
import EditUser from './pages/Users/EditUser';
import { ROLES } from './utils/constants';
import NewUser from './pages/Users/NewUser';
import Profile from './pages/Profile';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />

				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
						<Route path='dashboard' element={<Dashboard />}>
							<Route index element={<Home />} />
							<Route path='files' element={<Files />} />
							<Route path='users'>
								<Route index element={<Users />} />
								<Route path=':id' element={<EditUser />} />
								<Route path='new' element={<NewUser />} />
							</Route>
							<Route path='profile' element={<Profile />} />
						</Route>
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
