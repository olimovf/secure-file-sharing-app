import { Grid } from '@mui/material';
import File from '../../components/File';

const GridView = ({ file }: { file: FileType }) => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<File {...file} />
		</Grid>
	);
};

export default GridView;
