import { Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormWrapper } from '../Signup/style';
import { FormEvent } from 'react';
import GlobalContainer from '../../components/GlobalContainer';

const Login = () => {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<GlobalContainer maxWidth='xl'>
			<FormWrapper elevation={3}>
				<Typography variant='h4' textAlign='center' mb={2}>
					Login
				</Typography>
				{/* <Typography variant='body2' textAlign='center' color='error' mb={2}>
			Something went wrong
		</Typography> */}
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
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
								Login
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
