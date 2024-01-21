import {
	Typography,
	Grid,
	Card,
	CardContent,
	List,
	ListItem,
} from '@mui/material';

// Sample data (replace with your actual data)
const recentActivities = [
	'User A uploaded a file',
	'User B shared a folder with you',
	'User C commented on your file',
];

const frequentFiles = ['Document.pdf', 'Presentation.pptx', 'Image.png'];

const systemMessages = [
	'Upcoming maintenance scheduled on Jan 25, 2024',
	'New feature: File versioning is now available!',
];

// Dashboard component
const Home = () => {
	return (
		<>
			<Typography variant='h4' sx={{ mb: 2 }}>
				Home
			</Typography>

			{/* Recent Activities */}
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' gutterBottom>
								Recent Activities
							</Typography>
							<List>
								{recentActivities.map((activity, index) => (
									<ListItem key={index}>{activity}</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid>

				{/* Quick Access to Frequently Used Files/Folders */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant='h6' gutterBottom>
								Frequently Used Files/Folders
							</Typography>
							<List>
								{frequentFiles.map((file, index) => (
									<ListItem key={index}>{file}</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* System Messages */}
			<Card sx={{ mt: 4 }}>
				<CardContent>
					<Typography variant='h6' gutterBottom>
						System Messages
					</Typography>
					<List>
						{systemMessages.map((message, index) => (
							<ListItem key={index}>{message}</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</>
	);
};

export default Home;
