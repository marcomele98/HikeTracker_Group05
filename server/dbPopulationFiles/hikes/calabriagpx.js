'use strict';

const fs = require('fs');
var ca_file1,ca_file2,ca_file3,ca_file4,ca_file5,ca_file6,ca_file7,ca_file8;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//liguria
ca_file1 = readFile('GPX_files/calabria/hike1.gpx',ca_file1);
ca_file2 = readFile('GPX_files/calabria/hike2.gpx',ca_file2);
ca_file3 = readFile('GPX_files/calabria/hike3.gpx',ca_file3);
ca_file4 = readFile('GPX_files/calabria/hike4.gpx',ca_file4);
ca_file5 = readFile('GPX_files/calabria/hike5.gpx',ca_file5);
ca_file6 = readFile('GPX_files/calabria/hike6.gpx',ca_file6);
ca_file7 = readFile('GPX_files/calabria/hike7.gpx',ca_file7);
ca_file8 = readFile('GPX_files/calabria/hike8.gpx',ca_file8);

module.exports.ca_file1 =   ca_file1;
module.exports.ca_file2 =   ca_file2;
module.exports.ca_file3 =   ca_file3;
module.exports.ca_file4 =   ca_file4;
module.exports.ca_file5 =   ca_file5;
module.exports.ca_file6 =   ca_file6;
module.exports.ca_file7 =   ca_file7;
module.exports.ca_file8 =   ca_file8;