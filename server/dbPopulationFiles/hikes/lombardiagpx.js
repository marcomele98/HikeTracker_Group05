'use strict';

const fs = require('fs');
var lo_file1,lo_file2,lo_file3,lo_file4,lo_file5,lo_file6,lo_file7,lo_file8;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//liguria
lo_file1 = readFile('GPX_files/lombardia/hike1.gpx',lo_file1);
lo_file2 = readFile('GPX_files/lombardia/hike2.gpx',lo_file2);
lo_file3 = readFile('GPX_files/lombardia/hike3.gpx',lo_file3);
lo_file4 = readFile('GPX_files/lombardia/hike4.gpx',lo_file4);
lo_file5 = readFile('GPX_files/lombardia/hike5.gpx',lo_file5);
lo_file6 = readFile('GPX_files/lombardia/hike6.gpx',lo_file6);
lo_file7 = readFile('GPX_files/lombardia/hike7.gpx',lo_file7);
lo_file8 = readFile('GPX_files/lombardia/hike8.gpx',lo_file8);

module.exports.lo_file1 =   lo_file1;
module.exports.lo_file2 =   lo_file2;
module.exports.lo_file3 =   lo_file3;
module.exports.lo_file4 =   lo_file4;
module.exports.lo_file5 =   lo_file5;
module.exports.lo_file6 =   lo_file6;
module.exports.lo_file7 =   lo_file7;
module.exports.lo_file8 =   lo_file8;