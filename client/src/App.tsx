import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Files from './pages/Files';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='dashboard' element={<Dashboard />}>
					<Route index element={<Home />} />
					<Route path='files' element={<Files />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
