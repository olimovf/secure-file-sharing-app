import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrapper } from './style';
import { useEffect } from 'react';
import GlobalContainer from '../../components/GlobalContainer';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import useTitle from '../../hooks/useTitle';

type FormValuesType = {
	email: string;
	password: string;
};

const Login = () => {
	useTitle('Login');
	const [login, { isLoading, isError, error, reset }] =
		useLoginMutation<MutationType>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const theme = useTheme();

	const inputStyles = {
		'& .MuiInputBase-input:-webkit-autofill': {
			WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#252525' : '#fff'} inset !important`,
		},
		'& .MuiFormHelperText-root': {
			margin: '4px',
		},
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValuesType>();

	const onSubmit = async (data: FormValuesType) => {
		await login(data)
			.unwrap()
			.then(({ accessToken }: { accessToken: string }) => {
				dispatch(setCredentials({ accessToken }));
				navigate('/dashboard');
				notify('You are logged in successfully', 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message || 'Login failed', 'error');
			});
	};

	useEffect(() => {
		if (isError && error) {
			const timeoutId = setTimeout(() => {
				reset();
			}, 5000);

			return () => clearTimeout(timeoutId);
		}
	}, [isError, error, reset]);

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Login
				</Typography>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label='Email'
								fullWidth
								sx={inputStyles}
								error={!!errors.email}
								helperText={errors.email?.message}
								{...register('email', {
									required: 'Email is required',
									setValueAs(value) {
										return value.trim();
									},
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Invalid email',
									},
								})}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Password'
								type='password'
								fullWidth
								sx={inputStyles}
								error={!!errors.password}
								helperText={errors.password?.message}
								{...register('password', {
									required: 'Password is required',
								})}
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
