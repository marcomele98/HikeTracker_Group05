'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//liguria
const lo_file1 = readFile('GPX_files/lombardia/hike1.gpx');
const lo_file2 = readFile('GPX_files/lombardia/hike2.gpx');
const lo_file3 = readFile('GPX_files/lombardia/hike3.gpx');
const lo_file4 = readFile('GPX_files/lombardia/hike4.gpx');
const lo_file5 = readFile('GPX_files/lombardia/hike5.gpx');
const lo_file6 = readFile('GPX_files/lombardia/hike6.gpx');
const lo_file7 = readFile('GPX_files/lombardia/hike7.gpx');
const lo_file8 = readFile('GPX_files/lombardia/hike8.gpx');


module.exports.lo_file1 =   lo_file1;
module.exports.lo_file2 =   lo_file2;
module.exports.lo_file3 =   lo_file3;
module.exports.lo_file4 =   lo_file4;
module.exports.lo_file5 =   lo_file5;
module.exports.lo_file6 =   lo_file6;
module.exports.lo_file7 =   lo_file7;
module.exports.lo_file8 =   lo_file8;