import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
		</Routes>
	);
};

export default App;
