var express = require('express'),
	router = express.Router(),
	fileController = require('../controller/fileController');
	
module.exports = function(app) {
	router.route('/file')
			.get(fileController.get)
			.post(fileController.post);
	
	router.route('/validateFile')
			.get(fileController.validateFile);

	app.use('/api/', router);
};