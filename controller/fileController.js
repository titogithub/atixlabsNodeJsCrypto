const fileService = require('../service/fileService');

module.exports = {
	get: (req, res, next) => {
		try {
			const data = fileService.getFile();
			res.send(data);
		} catch (error) {
			next(error);
		}
	},
	post: async (req, res, next) => {
		try {
			const result = await fileService.postFile(req.body.message);
			res.send(result.toString());
		} catch (error) {
			next(error);
		}
	},
	validateFile: async (req, res, next) => {
		try {
			const result = await fileService.validateFile('hashFile');
			res.send(result);
		} catch (error) {
			next(error);
		}
	}
};