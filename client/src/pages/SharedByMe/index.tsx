import { Grid, Box, Typography, useTheme } from '@mui/material';
import { useGetFilesQuery } from '../../features/file/fileApiSlice';
import File from '../../components/File';
import { PulseLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const SharedByMe = () => {
	useTitle('Files shared by me');
	const { id } = useAuth();
	const { data: files, isLoading: filesLoading } = useGetFilesQuery(
		'filesList',
		{},
	);

	const theme = useTheme();

	const sharedBy =
		files?.filter((file: FileType) => file.sharedBy === id) || [];

	return (
		<>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}
			>
				<Typography variant='h4'>Shared by me</Typography>
			</Box>
			<Grid container spacing={2}>
				{filesLoading ? (
					<Grid item xs={12}>
						<PulseLoader color={theme.palette.primary.main} />
					</Grid>
				) : (
					<>
						{sharedBy?.length !== 0 ? (
							sharedBy?.map((file: FileType, i: number) => (
								<Grid key={i} item xs={12} sm={6} md={4} lg={3}>
									<File {...file} />
								</Grid>
							))
						) : (
							<Grid item xs={12}>
								<Typography align='center' pb={2} variant='subtitle1'>
									No files found
								</Typography>
							</Grid>
						)}
					</>
				)}
			</Grid>
		</>
	);
};

export default SharedByMe;
