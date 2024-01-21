import { Grid, Typography } from '@mui/material';
import Folder from '../../components/Folder';
import File from '../../components/File';

const Files = () => {
	return (
		<>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Files
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Folder name='Documents' size='125 KB' />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Folder name='Media' size='25 MB' />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<File name='Image.png' size='892 KB' />
				</Grid>
			</Grid>
		</>
	);
};

export default Files;
