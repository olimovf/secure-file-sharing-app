import { Grid, Box, Typography, IconButton } from '@mui/material';
import FileUpload from '@mui/icons-material/FileUpload';
import {
	useGetFilesQuery,
	useUploadFilesMutation,
} from '../../features/file/fileApiSlice';
import File from '../../components/File';
import notify from '../../utils/notify';

const Files = () => {
	const [uploadFiles] = useUploadFilesMutation<MutationType>();
	const { data: files } = useGetFilesQuery('filesList', {});

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (!event.target.files) return;

		const formData = new FormData();
		for (const file of event.target.files) {
			formData.append('files', file);
		}

		await uploadFiles(formData)
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			});
	};

	return (
		<>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}
			>
				<Typography variant='h4'>Files</Typography>
				<Box display='flex' gap={1}>
					<IconButton aria-label='upload' color='primary' component='label'>
						<FileUpload />
						<input
							type='file'
							accept='.docx, .pdf, .pptx'
							hidden
							multiple
							onChange={handleFileChange}
						/>
					</IconButton>
				</Box>
			</Box>
			<Grid container spacing={2}>
				{files?.length !== 0 ? (
					files?.map((file: FileType, i: number) => (
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
			</Grid>
		</>
	);
};

export default Files;
