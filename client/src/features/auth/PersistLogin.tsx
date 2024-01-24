import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
// import PulseLoader from 'react-spinners/PulseLoader';
import { Outlet, Link } from 'react-router-dom';

type UseRefreshMutationType = {
	isUninitialized: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	error: {
		status: number;
		data: {
			message: string;
		};
	};
};

const PersistLogin = () => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const effectRan = useRef(false);

	const [trueSuccess, setTrueSuccess] = useState(false);

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation<UseRefreshMutationType>();

	useEffect(() => {
		if (!effectRan.current || process.env.NODE_ENV !== 'development') {
			// React 18 Strict Mode
			const verifyRefreshToken = async () => {
				console.log('verifying refresh token');
				try {
					//const response =
					await refresh({});
					//const { accessToken } = response.data
					setTrueSuccess(true);
				} catch (err) {
					console.error(err);
				}
			};

			if (!token && persist) verifyRefreshToken();
		}

		return () => {
			effectRan.current = true;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, persist]);

	let content: React.ReactNode;

	if (!persist) {
		// persist: no
		console.log('no persist');
		content = <Outlet />;
	} else if (isLoading) {
		// persist: yes, token: no
		console.log('loading');
		content = <p>Loading...</p>; // <PulseLoader color={'#FFF'} />;
	} else if (isError) {
		// persist: yes, token: no
		console.log('error', error);
		content = (
			<p className='errmsg'>
				{`${error?.data?.message} - `}
				<Link to='/login'>Please login again</Link>.
			</p>
		);
	} else if (isSuccess && trueSuccess) {
		// persist: yes, token: yes
		console.log('success');
		content = <Outlet />;
	} else if (token && isUninitialized) {
		// persist: yes, token: yes
		console.log('token and uninit');
		console.log(isUninitialized);
		content = <Outlet />;
	}

	return content;
};

export default PersistLogin;
