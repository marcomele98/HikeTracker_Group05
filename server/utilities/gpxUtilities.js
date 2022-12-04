'use strict';

const fs = require('fs');

function readFile(filePath) {
    return fs.readFileSync(filePath).toString();
}

module.exports.readFile = readFile;


