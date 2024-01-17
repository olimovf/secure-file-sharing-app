require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

connectDB();

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
