const fs = require('fs');
const crypto = require('crypto');
const getLastLine = require('../utils/fileUtils').getLastLine;
const appendLine = require('../utils/fileUtils').appendLine;
const validateFile = require('../utils/fileUtils').validateFile;
const generateNonce = require('../utils/nonceUtils').generateNonce;
const filePath = process.env.FILE_PATH || 'hashFile';
const generateRandomHexNumbers = require('../utils/mathUtils').generateRandomHexNumbers;

module.exports = {
	getFile: (req) => {
			const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'}); 
			return data;
	},
	postFile: async (message) => {
		const lastLine = await getLastLine(filePath, 1);
		if (lastLine) {	
			const lineArray = lastLine.split(',');
			const resultHash = generateNonce(lineArray, message);
			appendLine(filePath, resultHash.toString(), lastLine);
			return resultHash;
		} else {
			const firstHash = `00${generateRandomHexNumbers(62)}`;
			const resultHash = generateNonce(firstHash, message);
			appendLine(filePath, resultHash.toString(), lastLine);
			return resultHash;
		}
	},
	validateFile: (filePath) => {
		return validateFile(filePath);
	}
};