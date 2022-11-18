
const fs = require('fs');
var pm_file1,pm_file2,pm_file3,pm_file4,pm_file5,pm_file6;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//piemonte
pm_file1 = readFile('GPX_files/piemonte/hike1.gpx',pm_file1); //rocciamelone gpx
pm_file2 = readFile('GPX_files/piemonte/hike2.gpx',pm_file2); //Ascesa al Rifugio Savona
pm_file3 = readFile('GPX_files/piemonte/hike3.gpx',pm_file3); //Salita al Monte Antoroto
pm_file4 = readFile('GPX_files/piemonte/hike4.gpx',pm_file4); //Salita al Bric Mindino e al Colle di Prato Rotondo
pm_file5 = readFile('GPX_files/piemonte/hike5.gpx',pm_file5); //Salita al Bric Mindino e al Colle di Prato Rotondo
pm_file6 = readFile('GPX_files/piemonte/hike6.gpx',pm_file6); //Salita al Bric Mindino e al Colle di Prato Rotondo

module.exports.pm_file1 =   pm_file1 ;
module.exports.pm_file2 =   pm_file2;
module.exports.pm_file3 =   pm_file3;
module.exports.pm_file4 =   pm_file4;
module.exports.pm_file5 =   pm_file5;
module.exports.pm_file6 =   pm_file6 ;

