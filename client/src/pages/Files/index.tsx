import { Grid, Box, Typography, IconButton } from '@mui/material';
import Folder from '../../components/Folder';
// import File from '../../components/File';
// import { useState } from 'react';
import FileUpload from '@mui/icons-material/FileUpload';
import { useUploadFilesMutation } from '../../features/file/fileApiSlice';

type UseUploadFilesMutationType = {
	isLoading: boolean;
	isError: boolean;
	error: {
		status: number;
		data: {
			message: string;
		};
	};
};

const Files = () => {
	const [uploadFiles, { isLoading, isError, error }] =
		useUploadFilesMutation<UseUploadFilesMutationType>();

	if (isLoading) console.log('loading');

	if (isError) {
		console.log(error?.data?.message);
		alert(error.data.message);
	}

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (!event.target.files) return;

		const formData = new FormData();
		for (const file of event.target.files) {
			console.log(file);
			formData.append('files', file);
		}

		await uploadFiles(formData).unwrap();
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
					{isError && <p>{error.data.message}</p>}
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
