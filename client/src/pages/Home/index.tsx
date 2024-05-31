import {
	Typography,
	Grid,
	Card,
	CardContent,
	List,
	ListItem,
	Divider,
	TextField,
	Box,
	Button,
	Avatar,
	Autocomplete,
	ListItemAvatar,
	useTheme,
	ListItemText,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { fileIcons, formatBytes } from '../../utils';
import { useGetUsersQuery } from '../../features/users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import notify from '../../utils/notify';
import { useUploadFilesMutation } from '../../features/file/fileApiSlice';
import { acceptedFileTypes } from '../../utils/constants';
import useTitle from '../../hooks/useTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
	useTitle('Share files');
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			'application/pdf': acceptedFileTypes,
		},
	});
	const { id } = useAuth();

	const { data: users } = useGetUsersQuery('usersList', {});
	const [uploadFiles, { isLoading: uploadFilesLoading }] =
		useUploadFilesMutation<MutationType>();
	const [selectedUser, setSelectedUser] = useState<{
		label: string;
		id: string;
	} | null>(null);

	const options = users
		?.filter((user: UserType) => user?._id !== id && user?.verified)
		.map((user: UserType) => ({
			label: user?.firstName,
			id: user?._id,
		}));

	const handleSubmit = async () => {
		if (acceptedFiles.length === 0) {
			notify('No files are selected', 'error');
			return;
		}

		if (!selectedUser) {
			notify('No user is selected', 'error');
			return;
		}

		const formData = new FormData();
		for (const file of acceptedFiles) {
			formData.append('files', file);
		}

		formData.append('userTo', selectedUser?.id);

		await uploadFiles(formData)
			.unwrap()
			.then((data) => {
				notify(data?.message, 'success');
			})
			.catch((err) => {
				notify(err?.data?.message || err?.message, 'error');
			})
			.finally(() => {
				setTimeout(() => {
					setSelectedUser(null);
				}, 2000);
			});
	};

	const theme = useTheme();

	return (
		<>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Share files
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12} lg={8}>
					<Card>
						<CardContent>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								gap={1}
								flexWrap={'wrap'}
								mb={1}
							>
								<Box display={'flex'} alignItems={'center'} gap={1}>
									<Typography variant='h6'>File type:</Typography>
									<Typography variant='body1' fontStyle={'italic'}>
										{acceptedFileTypes.join(', ')}
									</Typography>
								</Box>
								<Box display={'flex'} alignItems={'center'} gap={1}>
									<Typography variant='h6'>Max file size:</Typography>
									<Typography variant='body1' fontStyle={'italic'}>
										5 MB
									</Typography>
								</Box>
							</Box>

							<Divider />
							<Box
								{...getRootProps()}
								sx={{
									border: `2px dashed ${theme.palette.primary.main}`,
									borderRadius: 1,
									p: 4,
									my: 2,
								}}
							>
								<input {...getInputProps()} />
								<Typography align='center'>
									Drag and drop some files here, or click to select files
								</Typography>
							</Box>
							<List
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 1,
									py: 0,
								}}
							>
								{acceptedFiles.map((file, index) => (
									<ListItem
										key={index}
										sx={{
											bgcolor: theme.palette.background.default,
											borderRadius: 1,
										}}
										secondaryAction={formatBytes(file.size)}
									>
										<ListItemAvatar>
											<Avatar sx={{ bgcolor: theme.palette.primary.main }}>
												<FontAwesomeIcon
													icon={fileIcons(
														file.name.slice(file.name.lastIndexOf('.')),
													)}
												/>
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={file.name} />
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid>

				<Grid item xs={12} lg={4}>
					<Card>
						<CardContent>
							<Typography variant='h6' gutterBottom>
								Users
							</Typography>
							<Divider />
							<Box display={'flex'} flexDirection={'column'} gap={2} mt={2}>
								<Autocomplete
									disablePortal
									options={options || []}
									value={selectedUser}
									isOptionEqualToValue={(option, value) =>
										option.id === value.id
									}
									onChange={(_, newValue) => setSelectedUser(newValue)}
									renderInput={(params) => (
										<TextField {...params} label='Select' />
									)}
								/>
								<Button
									size='small'
									variant='contained'
									disabled={uploadFilesLoading}
									onClick={handleSubmit}
								>
									Send files
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
