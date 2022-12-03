'use strict';

const { readFile} = require('../../utilities/gpxUtilities');


//piemonte
const va_file1 = readFile('./GPX_files/valledaosta/hike1.gpx'); //Valtournenche - Lago di Cignana
const va_file2 = readFile('./GPX_files/valledaosta/hike2.gpx'); //Cervinia - Cappella 
const va_file3 = readFile('./GPX_files/valledaosta/hike3.gpx'); //Cime Bianche
const va_file4 = readFile('./GPX_files/valledaosta/hike4.gpx'); //Lac e Château De Villa
const va_file5 = readFile('./GPX_files/valledaosta/hike5.gpx'); //Monte Zerbion
const va_file6 = readFile('./GPX_files/valledaosta/hike6.gpx'); //Ospizio Sottile
const va_file7 = readFile('./GPX_files/valledaosta/hike7.gpx'); //Parco del Monte Avic
const va_file8 = readFile('./GPX_files/valledaosta/hike8.gpx'); //Torgnon

module.exports.va_file1 =   va_file1;
module.exports.va_file2 =   va_file2;
module.exports.va_file3 =   va_file3;
module.exports.va_file4 =   va_file4;
module.exports.va_file5 =   va_file5;
module.exports.va_file6 =   va_file6;
module.exports.va_file7 =   va_file7;
module.exports.va_file8 =   va_file8;