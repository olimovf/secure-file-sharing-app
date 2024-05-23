const express = require('express');
const serverlessHttp = require('serverless-http');

const app = express();

app.use('/.netlify/functions/api', require('../index'));

const handler = serverlessHttp(app);
module.exports.handler = async (event, context) => {
	return await handler(event, context);
};
