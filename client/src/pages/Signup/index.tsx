import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormWrapper } from './style';
import GlobalContainer from '../../components/GlobalContainer';
import { useForm } from 'react-hook-form';
import { useAddNewUserMutation } from '../../features/users/usersApiSlice';
import notify from '../../utils/notify';

const inputStyles = {
	'& .MuiInputBase-input:-webkit-autofill': {
		WebkitBoxShadow: `0 0 0 100px #252525 inset !important`,
	},
	'& .MuiFormHelperText-root': {
		margin: '4px',
	},
};

type PasswordType = {
	password: string;
};

type FormValuesType = Omit<UserType, '_id' | 'verified' | 'roles'> &
	PasswordType;

const Signup = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValuesType>();

	const [addNewUser, { isLoading: addNewUserLoading }] =
		useAddNewUserMutation<MutationType>();

	const onSubmit = async (data: FormValuesType) => {
		await addNewUser({ ...data })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
				setTimeout(() => {
					reset();
				}, 2000);
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
	};

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Sign Up
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								sx={inputStyles}
								label='First Name'
								fullWidth
								{...register('firstName', {
									required: 'First name is required',
									setValueAs(value) {
										return value.trim();
									},
								})}
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={inputStyles}
								label='Last Name'
								fullWidth
								{...register('lastName', {
									required: 'Last name is required',
									setValueAs(value) {
										return value.trim();
									},
								})}
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={inputStyles}
								label='Email'
								type='email'
								fullWidth
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
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={inputStyles}
								label='Password'
								type='password'
								fullWidth
								{...register('password', {
									setValueAs(value) {
										return value.trim();
									},
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
									pattern: {
										value:
											/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
										message:
											'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
									},
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								fullWidth
								disabled={addNewUserLoading}
							>
								Sign up
							</Button>
						</Grid>
					</Grid>
				</form>

				<Typography variant='body2' textAlign='center' my={2}>
					Already have an account{' '}
					<Link to='/login' style={{ color: 'inherit' }}>
						LOGIN
					</Link>
				</Typography>
			</FormWrapper>
		</GlobalContainer>
	);
};

export default Signup;
