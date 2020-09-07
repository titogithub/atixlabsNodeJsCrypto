const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
var os = require("os");
const crypto = require('crypto');

exports.getLastLine = (fileName, minLength) => {
    let inStream = fs.createReadStream(fileName);
    let outStream = new Stream;
    return new Promise((resolve, reject)=> {
        let rl = readline.createInterface(inStream, outStream);
        let lastLine = '';
        rl.on('line', function (line) {
            if (line.length >= minLength) {
                lastLine = line;
            }
        });
        rl.on('error', reject)
        rl.on('close', function () {
            resolve(lastLine)
        });
    })
}

exports.appendLine = (filePath, line, lastLine) => {
    const newLine = fs.createWriteStream(filePath, {
        flags: 'a'
    });
    if (!lastLine) {
        newLine.write(line);
    } else {
        newLine.write(os.EOL);
        newLine.write(line);
    }
}

exports.validateFile = async (filePath) => {
    const validate = RegExp('^00.*');
    const fileStream = fs.createReadStream(filePath);
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let nextHash;
    let firstLine = true;
    for await (const line of rl) {
        if (firstLine) {
            const lineArray = line.split(',');
            nextHash = crypto.createHash('sha256').update(lineArray.toString(),'utf8').digest('hex').toString();
            if (!validate.test(lineArray[0])) {
                return {valid:false, line};
            }
            if (!validate.test(nextHash)) {
                return {valid:false, line};
            }
            firstLine = false;
        } else {
            const lineArray = line.split(',');

            if (!validate.test(lineArray[0])) {
                return {valid:false, line};
            }
            if (lineArray[0] !== nextHash) {
                return {valid:false, line};
            }
            nextHash = crypto.createHash('sha256').update(lineArray.toString(),'utf8').digest('hex').toString();
            if (!validate.test(nextHash)) {
                return {valid:false, line};
            }
        }
    }
    return {valid:true};
}