const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router
	.route('/')
	.get(activityController.getAllActivities)
	.delete(activityController.deleteAllActivities);

module.exports = router;
