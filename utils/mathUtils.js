exports.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.parseHex = (number) => {
	return (number).toString(16);
}

exports.generateRandomHexNumbers = (quantity) => {
	let randomHex = '';
	for (let index = 0; index < quantity; index++) {
		randomHex+= this.parseHex(this.getRandomInt(0, 15));
	}
	return randomHex;
}