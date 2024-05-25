import { Paper, Typography, Skeleton } from '@mui/material';
import GlobalContainer from '../../components/GlobalContainer';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useVerifyUserQuery } from '../../features/users/usersApiSlice';
import { useParams } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

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
	useTitle('Verification');
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
				{isLoading ? (
					<Skeleton
						variant='rounded'
						width={'100%'}
						height={120}
						animation='wave'
					/>
				) : isError ? (
					<NewReleasesIcon color='error' sx={{ fontSize: '80px' }} />
				) : (
					<VerifiedIcon color='success' sx={{ fontSize: '80px' }} />
				)}
				<Typography variant='h6' align='center'>
					{isLoading ? (
						<Skeleton width={280} variant='text' animation='wave'></Skeleton>
					) : isError ? (
						error?.data?.message ||
						'Something went wrong. Please, make sure to click the right verification link sent to your email'
					) : (
						data?.message
					)}
				</Typography>
			</Paper>
		</GlobalContainer>
	);
};

export default Verification;
