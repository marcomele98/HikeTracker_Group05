'use strict';

const {pm_file1,pm_file2,pm_file3,pm_file4,pm_file5,pm_file6} = require('./piemontegpx');
const {tn_file1,tn_file2,tn_file3,tn_file4,tn_file5,tn_file6} = require('./trentinogpx');

var hikevalues =
[
  [ 'Path to ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'Piemonte', 'TO', 'Mompantero', 1,
  pm_file1, 1, 'general point', 1, 'Hut point','A well-known route, much loved by Valsusini and beyond. It is long and challenging because of the difference in height, but very well signposted and above all with a support point about halfway'], //endpoint:1 pointtable,strtpoint:1 hut
  [ 'Ascesa al Rifugio Savona', 10.3, 244, 610, 'Hiker','Piemonte', 'CN', 'Garessio', 1,
  pm_file2, 1, 'Parking point', 1, 'Parking point','Intermediate Hiking Tour. Good fitness required. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot'],//endpoint:1 parking,strtpoint:1 parking
  [ 'Salita al Monte Antoroto', 17, 444, 1090, 'Professional Hiker','Piemonte', 'CN', 'Garessio', 1,
  pm_file3, 1, 'Parking point', 1, 'Parking point',': A part of this route comprises technical, difficult, or hazardous terrain. Specialist equipment and prior experience may be required'],//endpoint:1 parking,strtpoint:1 parking
  [ 'Salita al Bric Mindino e al Colle di Prato Rotondo', 9.2, 218, 610, 'Hiker','Piemonte', 'CN', 'Garessio', 1,
  pm_file4, 2, 'Parking point', 2, 'Parking point','Intermediate Hiking Tour. Good fitness required. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot.'],//endpoint:2 parking,strtpoint:2 parking
  [ 'Colletta di Castelbianco Loop from Veravo', 5.7, 105, 206, 'Tourist','Liguria', 'SV', 'Castelbianco', 1,
  pm_file5, 3, 'Parking point', 3, 'Parking point','Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels. The starting point of the Tour is right next to a parking lot.'],//endpoint:3 parking,strtpoint:3 parking
  [ 'Chiesa di Santa Libera Loop from Losano', 4.6, 80, 122, 'Tourist','Piemonte', 'TO', 'Frailino', 1,
  pm_file6, 6, 'general point', 6, 'general point','Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels.']//endpoint:2 pointtable,strtpoint:3 pointtable
];

module.exports.hikevalues =   hikevalues;
