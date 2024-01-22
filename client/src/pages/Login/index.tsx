import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrapper } from '../Signup/style';
import { FormEvent, useState } from 'react';
import GlobalContainer from '../../components/GlobalContainer';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

const Login = () => {
	const [login, { isLoading }] = useLoginMutation();
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

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Login
				</Typography>

				{/* <Typography variant='body2' textAlign='center' color='error' mb={2}>
					{error!.data!.message}
				</Typography> */}

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
