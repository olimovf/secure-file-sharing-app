import {
	Button,
	Grid,
	TextField,
	Typography,
	Alert,
	useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrapper } from './style';
import { FormEvent, useState } from 'react';
import GlobalContainer from '../../components/GlobalContainer';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

type UseLoginMutationType = {
	isLoading: boolean;
	isError: boolean;
	error: {
		status: number;
		data: {
			message: string;
		};
	};
};

const Login = () => {
	const [login, { isLoading, isError, error }] =
		useLoginMutation<UseLoginMutationType>();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const { accessToken } = await login({ email, password }).unwrap();
		dispatch(setCredentials({ accessToken }));
		navigate('/dashboard');
	};

	const theme = useTheme();

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Login
				</Typography>

				{isError && (
					<Alert severity='error' variant='filled' sx={{ mb: 2.5 }}>
						{error!.data!.message}
					</Alert>
				)}

				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label='Email'
								type='email'
								name='email'
								fullWidth
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								sx={{
									'& .MuiInputBase-input:-webkit-autofill': {
										WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset !important`,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Password'
								type='password'
								name='password'
								fullWidth
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								sx={{
									'& .MuiInputBase-input:-webkit-autofill': {
										WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset !important`,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								fullWidth
								disabled={isLoading}
							>
								{isLoading ? 'Logging in...' : 'Login'}
							</Button>
						</Grid>
					</Grid>
				</form>

				<Typography variant='body2' textAlign='center' my={2}>
					Don't have an account{' '}
					<Link to='/signup' style={{ color: 'inherit' }}>
						SIGN UP
					</Link>
				</Typography>
			</FormWrapper>
		</GlobalContainer>
	);
};

export default Login;
