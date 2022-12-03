'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//piemonte
const tn_file1 = readFile('./GPX_files/Trentino/hike1.gpx'); //rocciamelone gpx
const tn_file2 = readFile('./GPX_files/Trentino/hike2.gpx'); //Ascesa al Rifugio Savona
const tn_file3 = readFile('./GPX_files/Trentino/hike3.gpx'); //Salita al Monte Antoroto
const tn_file4 = readFile('./GPX_files/Trentino/hike4.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const tn_file5 = readFile('./GPX_files/Trentino/hike5.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const tn_file6 = readFile('./GPX_files/Trentino/hike6.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const tn_file7 = readFile('./GPX_files/Trentino/hike7.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo
const tn_file8 = readFile('./GPX_files/Trentino/hike8.gpx'); //Salita al Bric Mindino e al Colle di Prato Rotondo

module.exports.tn_file1 =   tn_file1 ;
module.exports.tn_file2 =   tn_file2;
module.exports.tn_file3 =   tn_file3;
module.exports.tn_file4 =   tn_file4;
module.exports.tn_file5 =   tn_file5;
module.exports.tn_file6 =   tn_file6;
module.exports.tn_file7 =   tn_file7;
module.exports.tn_file8 =   tn_file8;

