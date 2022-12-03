'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//liguria
const ca_file1 = readFile('GPX_files/calabria/hike1.gpx');
const ca_file2 = readFile('GPX_files/calabria/hike2.gpx');
const ca_file3 = readFile('GPX_files/calabria/hike3.gpx');
const ca_file4 = readFile('GPX_files/calabria/hike4.gpx');
const ca_file5 = readFile('GPX_files/calabria/hike5.gpx');
const ca_file6 = readFile('GPX_files/calabria/hike6.gpx');
const ca_file7 = readFile('GPX_files/calabria/hike7.gpx');
const ca_file8 = readFile('GPX_files/calabria/hike8.gpx');

module.exports.ca_file1 =   ca_file1;
module.exports.ca_file2 =   ca_file2;
module.exports.ca_file3 =   ca_file3;
module.exports.ca_file4 =   ca_file4;
module.exports.ca_file5 =   ca_file5;
module.exports.ca_file6 =   ca_file6;
module.exports.ca_file7 =   ca_file7;
module.exports.ca_file8 =   ca_file8;