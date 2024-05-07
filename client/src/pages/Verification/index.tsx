import { Paper, Typography } from '@mui/material';
import GlobalContainer from '../../components/GlobalContainer';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useVerifyUserQuery } from '../../features/users/usersApiSlice';
import { useParams } from 'react-router-dom';

type VerifyUserQueryType = {
	isUninitialized: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	data: {
		message: string;
	};
	error: {
		status: number;
		data: {
			message: string;
		};
	};
};

const Verification = () => {
	const { userId, token } = useParams();

	const { data, isError, error, isLoading } =
		useVerifyUserQuery<VerifyUserQueryType>({
			userId,
			token,
		});

	return (
		<GlobalContainer maxWidth='lg'>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					width: 350,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					alignItems: 'center',
				}}
			>
				{isError ? (
					<NewReleasesIcon color='error' sx={{ fontSize: '80px' }} />
				) : (
					<VerifiedIcon color='success' sx={{ fontSize: '80px' }} />
				)}
				<Typography variant='h6' align='center'>
					{isLoading
						? null
						: isError
							? error?.data.message ||
								'Something went wrong. Please, make sure to click the right verification link sent to your email'
							: data?.message}
				</Typography>
			</Paper>
		</GlobalContainer>
	);
};

export default Verification;
