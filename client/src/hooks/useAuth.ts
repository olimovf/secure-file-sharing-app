import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

type AuthInfo = {
	id: string;
	roles: string[];
	// isAdmin: boolean;
	// status: 'User' | 'Admin';
};

type DecodedToken = {
	UserInfo: AuthInfo;
};

const useAuth = (): AuthInfo => {
	const token = useSelector(selectCurrentToken);

	// let isAdmin = false;
	// let status: 'User' | 'Admin' = 'User';
	let id = '';
	let roles: string[] = [];

	if (token) {
		const decoded = jwtDecode(token) as DecodedToken | null;

		if (decoded) {
			const { id: userId, roles: userRoles } = decoded?.UserInfo || {};

			id = userId || '';
			roles = userRoles || [];

			// isAdmin = roles.includes('Admin');

			// if (isAdmin) status = 'Admin';
		}
	}

	return { id, roles };
};

export default useAuth;
