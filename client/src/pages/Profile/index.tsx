import {
	Box,
	Typography,
	TextField,
	Button,
	Autocomplete,
	useTheme,
} from '@mui/material';
import {
	useGetUsersQuery,
	useUpdateUserMutation,
} from '../../features/users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import { Controller, useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import { useEffect } from 'react';
import { ROLES } from '../../utils/constants';
import useTitle from '../../hooks/useTitle';

type PasswordType = {
	password?: string;
};
type FormValuesType = Omit<UserType, '_id' | 'verified'> & PasswordType;

const Profile = () => {
	useTitle('Profile');
	const { id, roles } = useAuth();
	const { user }: { user: UserType } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.find((user: UserType) => user._id === id),
		}),
	});
	const [updateUser, { isLoading: updateUserLoading }] =
		useUpdateUserMutation<MutationType>();

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors, dirtyFields },
	} = useForm<FormValuesType>();

	const onSubmit = async (data: FormValuesType) => {
		await updateUser({ id, ...data })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
	};

	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName);
			setValue('lastName', user.lastName);
			setValue('email', user.email);
			setValue('roles', user.roles);
		}
	}, [user, setValue]);

	const theme = useTheme();

	const inputStyles = {
		'& .MuiInputBase-input:-webkit-autofill': {
			WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#252525' : '#fff'} inset !important`,
		},
		'& .MuiFormHelperText-root': {
			margin: '4px',
		},
	};

	return (
		<Box>
			<Typography variant='h4'>Profile</Typography>
			<Box
				display={'flex'}
				flexDirection={'column'}
				gap={2}
				mt={2}
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Typography
						component={'label'}
						htmlFor='firstName'
						gutterBottom
						sx={{ display: 'inline-block', mb: 1 }}
					>
						First name
					</Typography>
					<TextField
						fullWidth
						id='firstName'
						variant='outlined'
						{...register('firstName', {
							required: 'First name is required',
							setValueAs(value) {
								return value.trim();
							},
						})}
						error={!!errors.firstName}
						helperText={errors.firstName?.message}
						sx={inputStyles}
					/>
				</div>

				<div>
					<Typography
						component={'label'}
						htmlFor='lastName'
						gutterBottom
						sx={{ display: 'inline-block', mb: 1 }}
					>
						Last name
					</Typography>
					<TextField
						fullWidth
						id='lastName'
						variant='outlined'
						{...register('lastName', {
							required: 'Last name is required',
							setValueAs(value) {
								return value.trim();
							},
						})}
						error={!!errors.lastName}
						helperText={errors.lastName?.message}
						sx={inputStyles}
					/>
				</div>

				<div>
					<Typography
						component={'label'}
						htmlFor='email'
						gutterBottom
						sx={{ display: 'inline-block', mb: 1 }}
					>
						Email
					</Typography>
					<TextField
						fullWidth
						id='email'
						variant='outlined'
						disabled
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
						sx={inputStyles}
					/>
				</div>

				{roles.includes(ROLES.admin) && (
					<div>
					<Typography
						component={'label'}
						htmlFor='roles'
						gutterBottom
						sx={{ display: 'inline-block', mb: 1 }}
					>
						Roles
					</Typography>
					<Controller
						name='roles'
						control={control}
						defaultValue={user?.roles || []}
						rules={{ required: 'Select at least one role' }}
						render={({ field }) => (
							<Autocomplete
								multiple
								id='roles'
								options={Object.values(ROLES)}
								value={field.value}
								disabled={!roles.includes(ROLES.admin)}
								onChange={(_, newValue) => field.onChange(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder='Select the roles'
										error={!!errors.roles}
										helperText={errors.roles?.message}
										autoComplete='off'
										sx={inputStyles}
									/>
								)}
							/>
						)}
					/>
				</div>
				)}

				<div>
					<Typography
						component={'label'}
						htmlFor='password'
						gutterBottom
						sx={{ display: 'inline-block', mb: 1 }}
					>
						Password
					</Typography>
					<TextField
						type='password'
						fullWidth
						id='password'
						sx={inputStyles}
						error={!!errors.password}
						helperText={errors.password?.message}
						{...register('password', {
							setValueAs(value) {
								return value.trim();
							},
							minLength: {
								value: 8,
								message: 'Password must be at least 8 characters long',
							},
							pattern: {
								value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
								message:
									'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
							},
						})}
					/>
				</div>

				<Box display='flex' gap={2} alignSelf={'flex-end'}>
					<Button
						type='submit'
						variant='contained'
						disabled={
							updateUserLoading || Object.keys(dirtyFields).length === 0
						}
						size='small'
					>
						Save
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
