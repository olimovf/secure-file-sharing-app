import { Link } from 'react-router-dom';
import GlobalContainer from '../../components/GlobalContainer';
import { Typography, Button } from '@mui/material';
import useTitle from '../../hooks/useTitle';

const NotFound = () => {
	useTitle('Page not found');

	return (
		<GlobalContainer maxWidth={'xl'} sx={{ flexDirection: 'column' }}>
			<Typography
				variant='h1'
				sx={{
					fontSize: { xs: '5rem', sm: '7rem' },
					letterSpacing: '4px',
				}}
			>
				404
			</Typography>
			<Typography
				variant='h4'
				sx={{
					fontSize: { xs: '1.5rem', sm: '2rem' },
					mb: 2.5,
				}}
			>
				Page Not Found
			</Typography>
			<Link to='/dashboard'>
				<Button variant='contained' color='primary'>
					Back to Home
				</Button>
			</Link>
		</GlobalContainer>
	);
};

export default NotFound;
