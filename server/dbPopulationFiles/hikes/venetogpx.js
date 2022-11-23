'use strict';

const fs = require('fs');

function readFile(filePath) {
    return fs.readFileSync(filePath).toString();
}

const ven_file1 = readFile('GPX_files/veneto/hike1.gpx');
const ven_file2 = readFile('GPX_files/veneto/hike2.gpx');
const ven_file3 = readFile('GPX_files/veneto/hike3.gpx');
const ven_file4 = readFile('GPX_files/veneto/hike4.gpx');
const ven_file5 = readFile('GPX_files/veneto/hike5.gpx');
const ven_file6 = readFile('GPX_files/veneto/hike6.gpx');
const ven_file7 = readFile('GPX_files/veneto/hike7.gpx');
const ven_file8 = readFile('GPX_files/veneto/hike8.gpx');

module.exports.ven_file1 = ven_file1;
module.exports.ven_file2 = ven_file2;
module.exports.ven_file3 = ven_file3;
module.exports.ven_file4 = ven_file4;
module.exports.ven_file5 = ven_file5;
module.exports.ven_file6 = ven_file6;
module.exports.ven_file7 = ven_file7;
module.exports.ven_file8 = ven_file8;