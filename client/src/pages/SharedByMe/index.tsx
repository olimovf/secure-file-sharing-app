import {
	Grid,
	Box,
	Typography,
	useTheme,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';
import { useGetFilesQuery } from '../../features/file/fileApiSlice';
import { PulseLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import React, { useState } from 'react';
import ListView from '../../components/File/ListView';
import GridView from '../../components/File/GridView';

const SharedByMe = () => {
	useTitle('Files shared by me');
	const { id } = useAuth();
	const { data: files, isLoading: filesLoading } = useGetFilesQuery(
		'filesList',
		{},
	);

	const [view, setView] = useState<string>('list');

	const handleViewChange = (
		_: React.MouseEvent<HTMLElement>,
		nextView: string | null,
	) => {
		if (nextView !== null) {
			setView(nextView);
		}
	};

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
				<ToggleButtonGroup
					value={view}
					color='primary'
					exclusive
					size={'small'}
					onChange={handleViewChange}
				>
					<ToggleButton value='list' aria-label='list' sx={{ p: 0.5 }}>
						<ViewListIcon fontSize='small' />
					</ToggleButton>
					<ToggleButton value='grid' aria-label='grid' sx={{ p: 0.5 }}>
						<ViewModuleIcon fontSize='small' />
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<Grid container spacing={view === 'list' ? 1 : 2}>
				{filesLoading ? (
					<Grid item xs={12}>
						<PulseLoader color={theme.palette.primary.main} />
					</Grid>
				) : (
					<>
						{sharedBy?.length !== 0 ? (
							sharedBy.map((file: FileType, index: number) => {
								return view === 'list' ? (
									<ListView key={index} file={file} isSharedBy={true} />
								) : (
									<GridView key={index} file={file} />
								);
							})
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
