'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//liguria
const li_file1 = readFile('GPX_files/liguria/hike1.gpx');
const li_file2 = readFile('GPX_files/liguria/hike2.gpx');
const li_file3 = readFile('GPX_files/liguria/hike3.gpx');
const li_file4 = readFile('GPX_files/liguria/hike4.gpx');
const li_file5 = readFile('GPX_files/liguria/hike5.gpx');
const li_file6 = readFile('GPX_files/liguria/hike6.gpx');
const li_file7 = readFile('GPX_files/liguria/hike7.gpx');
const li_file8 = readFile('GPX_files/liguria/hike8.gpx');

module.exports.li_file1 =   li_file1;
module.exports.li_file2 =   li_file2;
module.exports.li_file3 =   li_file3;
module.exports.li_file4 =   li_file4;
module.exports.li_file5 =   li_file5;
module.exports.li_file6 =   li_file6;
module.exports.li_file7 =   li_file7;
module.exports.li_file8 =   li_file8;