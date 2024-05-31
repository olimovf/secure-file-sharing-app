require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const PORT = process.env.PORT || 3500;

require('./cron/index');

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(mongoSanitize());

app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/files', require('./routes/fileRoutes'));
app.use('/activity', require('./routes/activityRoutes'));

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
