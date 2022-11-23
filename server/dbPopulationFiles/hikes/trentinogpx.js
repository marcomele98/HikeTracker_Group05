'use strict';

const fs = require('fs');
var tn_file1,tn_file2,tn_file3,tn_file4,tn_file5,tn_file6,tn_file7,tn_file8;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//piemonte
tn_file1 = readFile('./GPX_files/Trentino/hike1.gpx',tn_file1); //rocciamelone gpx
tn_file2 = readFile('./GPX_files/Trentino/hike2.gpx',tn_file2); //Ascesa al Rifugio Savona
tn_file3 = readFile('./GPX_files/Trentino/hike3.gpx',tn_file3); //Salita al Monte Antoroto
tn_file4 = readFile('./GPX_files/Trentino/hike4.gpx',tn_file4); //Salita al Bric Mindino e al Colle di Prato Rotondo
tn_file5 = readFile('./GPX_files/Trentino/hike5.gpx',tn_file5); //Salita al Bric Mindino e al Colle di Prato Rotondo
tn_file6 = readFile('./GPX_files/Trentino/hike6.gpx',tn_file6); //Salita al Bric Mindino e al Colle di Prato Rotondo
tn_file7 = readFile('./GPX_files/Trentino/hike6.gpx',tn_file7); //Salita al Bric Mindino e al Colle di Prato Rotondo
tn_file8 = readFile('./GPX_files/Trentino/hike6.gpx',tn_file8); //Salita al Bric Mindino e al Colle di Prato Rotondo

module.exports.tn_file1 =   tn_file1 ;
module.exports.tn_file2 =   tn_file2;
module.exports.tn_file3 =   tn_file3;
module.exports.tn_file4 =   tn_file4;
module.exports.tn_file5 =   tn_file5;
module.exports.tn_file6 =   tn_file6;
module.exports.tn_file7 =   tn_file7;
module.exports.tn_file8 =   tn_file8;

