const schedule = require('node-schedule');
const axios = require('axios');

const endPoint = 'https://secure-file-sharing-api.onrender.com/users';

// Function to make the API request
const fetchApiData = async () => {
	try {
		const response = await axios.get(endPoint);
		console.log('API response:', response?.data);
	} catch (error) {
		console.log('Error fetching API data:', error?.response?.data?.message);
	}
};

// Schedule the job to run every 5 minutes
schedule.scheduleJob('*/5 * * * *', () => {
	console.log('Running scheduled job at', new Date().toLocaleString());
	fetchApiData();
});
