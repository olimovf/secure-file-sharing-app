import { Grid, Box, Typography, IconButton } from '@mui/material';
import Folder from '../../components/Folder';
// import File from '../../components/File';
import { useState } from 'react';
import FileUpload from '@mui/icons-material/FileUpload';

const Files = () => {
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.files) {
			setSelectedFiles(event.target.files);

			const formData = new FormData();
			for (let i = 0; i < event.target.files.length; i++) {
				formData.append('files', event.target.files[i]);
			}

			// try {
			await fetch('http://localhost:3500/upload', {
				method: 'POST',
				body: formData,
			})
				.then((data) => data.json())
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log('error', err.message);
				});
			// } catch (error) {
			// 	console.error('Error uploading files:', error);
			// }

			// // Log uploaded files to the console
			// console.log('Uploaded files:');
			// for (let i = 0; i < event.target.files.length; i++) {
			// 	console.log(event.target.files[i]);
			// }
		}
	};

	const fileSystem = [
		{
			name: 'Documents',
			type: 'folder',
			items: [
				{
					name: 'music1',
					type: 'file',
					items: [],
				},
				{
					name: 'music2',
					type: 'file',
					items: [],
				},
			],
		},
		{
			name: 'Media',
			type: 'folder',
			items: [
				{
					name: 'image',
					type: 'file',
					items: [],
				},
			],
		},
		{
			name: 'Book',
			type: 'file',
			items: [],
		},
	];

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
				{fileSystem.map((fs, i) => (
					<Grid key={i} item xs={12} sm={6} md={4} lg={3}>
						<Folder name={fs.name} />
					</Grid>
				))}
				{/* <Grid item xs={12} sm={6} md={4} lg={3}>
					<Folder name='Documents' size='125 KB' />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Folder name='Media' size='25 MB' />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<File name='Image.png' size='892 KB' />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<File name='Image.jpg' size='892 KB' />
				</Grid>
				 */}
			</Grid>
		</>
	);
};

export default Files;
