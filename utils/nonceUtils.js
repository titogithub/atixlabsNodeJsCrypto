const crypto = require('crypto');

exports.generateNonce = (previousLine, message) => {
	const validate = RegExp('^00.*');
	const nextHash = crypto.createHash('sha256').update(previousLine.toString(),'utf8').digest('hex').toString();
	if (previousLine.length === 3) {
		for (let index = 0; ; index++) {
			const arr = [nextHash, message, index];
			const resultCrypto = crypto.createHash('sha256').update(arr.toString(),'utf8').digest('hex').toString();
			if (validate.test(resultCrypto)){
				console.log('crypto: ', resultCrypto);
				console.log('nonce: ', index);
				return arr;
			}
		}
	} else {
		for (let index = 0; ; index++) {
			const arr = [previousLine, message, index];
			const resultCrypto = crypto.createHash('sha256').update(arr.toString(),'utf8').digest('hex').toString();
			if (validate.test(resultCrypto)){
				console.log('crypto: ', resultCrypto);
				console.log('nonce: ', index);
				return arr;
			}
		}
	}
}