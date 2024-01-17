import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormWrapper } from './style';
import { FormEvent } from 'react';
import GlobalContainer from '../../components/GlobalContainer';

const Signup = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Sign Up
				</Typography>
				{/* <Typography variant='body2' textAlign='center' color='error' mb={2}>
					Something went wrong
				</Typography> */}
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label='First Name' name='firstName' fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label='Last Name' name='lastName' fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label='Email' type='email' name='email' fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Password'
								type='password'
								name='password'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								fullWidth
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
