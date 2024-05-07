import {
	Box,
	Typography,
	Button,
	Autocomplete,
	TextField,
	useTheme,
} from '@mui/material';
import { useAddNewUserMutation } from '../../features/users/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import notify from '../../utils/notify';
import { useForm, Controller } from 'react-hook-form';
import { ROLES } from '../../utils/constants';

type FormValuesType = Omit<UserType, '_id' | 'verified'>;

const NewUser = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, dirtyFields },
	} = useForm<FormValuesType>();

	const [addNewUser, { isLoading: addNewUserLoading }] =
		useAddNewUserMutation<MutationType>();

	const onSubmit = async (data: FormValuesType) => {
		await addNewUser({ ...data, type: 'invitation' })
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			})
			.finally(() => {
				setTimeout(() => {
					navigate('/dashboard/users');
				}, 2000);
			});
	};

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
			<Typography variant='h4'>Add New User</Typography>
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
						sx={inputStyles}
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
						sx={inputStyles}
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
						sx={inputStyles}
						fullWidth
						id='email'
						variant='outlined'
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
				</div>

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
						rules={{ required: 'Select at least one role' }}
						render={({ field }) => (
							<Autocomplete
								multiple
								id='roles'
								options={Object.values(ROLES)}
								value={field.value}
								onChange={(_, newValue) => field.onChange(newValue)}
								renderInput={(params) => (
									<TextField
										sx={inputStyles}
										{...params}
										placeholder='Select the roles'
										error={!!errors.roles}
										helperText={errors.roles?.message}
									/>
								)}
							/>
						)}
					/>
				</div>

				<Box display='flex' gap={2} alignSelf={'flex-end'}>
					<Button
						type='submit'
						variant='outlined'
						disabled={addNewUserLoading}
						size='small'
						onClick={() => navigate('/dashboard/users')}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='contained'
						disabled={
							addNewUserLoading || Object.keys(dirtyFields).length === 0
						}
						size='small'
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default NewUser;
