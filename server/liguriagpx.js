'use strict';

const fs = require('fs');
var li_file1,li_file2,li_file3,li_file4,li_file5,li_file6,li_file7,li_file8;

function readFile(filePath,content) {
    const data = fs.readFileSync(filePath);
    //console.log(data.toString());
    content = data.toString();
    return content;
}
//liguria
li_file1 = readFile('GPX_files/liguria/hike1.gpx',li_file1);
li_file2 = readFile('GPX_files/liguria/hike2.gpx',li_file2);
li_file3 = readFile('GPX_files/liguria/hike3.gpx',li_file3);
li_file4 = readFile('GPX_files/liguria/hike4.gpx',li_file4);
li_file5 = readFile('GPX_files/liguria/hike5.gpx',li_file5);
li_file6 = readFile('GPX_files/liguria/hike6.gpx',li_file6);
li_file7 = readFile('GPX_files/liguria/hike7.gpx',li_file7);
li_file8 = readFile('GPX_files/liguria/hike8.gpx',li_file8);

module.exports.li_file1 =   li_file1;
module.exports.li_file2 =   li_file2;
module.exports.li_file3 =   li_file3;
module.exports.li_file4 =   li_file4;
module.exports.li_file5 =   li_file5;
module.exports.li_file6 =   li_file6;
module.exports.li_file7 =   li_file7;
module.exports.li_file8 =   li_file8;