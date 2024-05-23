require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const path = require('path');
const { deleteDirectoryRecursive } = require('./helpers');

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/files', require('./routes/fileRoutes'));
app.use('/activity', require('./routes/activityRoutes'));

app.get('/wipe-files', (req, res, next) => {
	const directoryPath = path.join(__dirname, 'files');
	deleteDirectoryRecursive(directoryPath);
	next();
});

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
