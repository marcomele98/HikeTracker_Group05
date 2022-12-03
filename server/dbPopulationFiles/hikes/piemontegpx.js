'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//piemonte
const pm_file1 = readFile('GPX_files/piemonte/hike1.gpx'); //rocciamelone gpx
const pm_file2 = readFile('GPX_files/piemonte/hike2.gpx'); //Ascesa al Rifugio Savona
const pm_file3 = readFile('GPX_files/piemonte/hike3.gpx'); //Salita al Monte Antoroto
const pm_file4 = readFile('GPX_files/piemonte/hike4.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const pm_file5 = readFile('GPX_files/piemonte/hike5.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const pm_file6 = readFile('GPX_files/piemonte/hike6.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo

module.exports.pm_file1 =   pm_file1 ;
module.exports.pm_file2 =   pm_file2;
module.exports.pm_file3 =   pm_file3;
module.exports.pm_file4 =   pm_file4;
module.exports.pm_file5 =   pm_file5;
module.exports.pm_file6 =   pm_file6 ;

