'use strict';

const fs = require('fs');
var va_file1,va_file2,va_file3,va_file4,va_file5,va_file6,va_file7,va_file8;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//piemonte
va_file1 = readFile('./GPX_files/valledaosta/hike1.gpx',va_file1); //Valtournenche - Lago di Cignana
va_file2 = readFile('./GPX_files/valledaosta/hike2.gpx',va_file2); //Cervinia - Cappella 
va_file3 = readFile('./GPX_files/valledaosta/hike3.gpx',va_file3); //Cime Bianche
va_file4 = readFile('./GPX_files/valledaosta/hike4.gpx',va_file4); //Lac e Château De Villa
va_file5 = readFile('./GPX_files/valledaosta/hike5.gpx',va_file5); //Monte Zerbion
va_file6 = readFile('./GPX_files/valledaosta/hike6.gpx',va_file6); //Ospizio Sottile
va_file7 = readFile('./GPX_files/valledaosta/hike7.gpx',va_file7); //Parco del Monte Avic
va_file8 = readFile('./GPX_files/valledaosta/hike8.gpx',va_file8); //Torgnon

module.exports.va_file1 =   va_file1;
module.exports.va_file2 =   va_file2;
module.exports.va_file3 =   va_file3;
module.exports.va_file4 =   va_file4;
module.exports.va_file5 =   va_file5;
module.exports.va_file6 =   va_file6;
module.exports.va_file7 =   va_file7;
module.exports.va_file8 =   va_file8;