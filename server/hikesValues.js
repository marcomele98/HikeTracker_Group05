'use strict';

const {pm_file1,pm_file2,pm_file3,pm_file4,pm_file5,pm_file6} = require('./piemontegpx');
const {tn_file1,tn_file2,tn_file3,tn_file4,tn_file5,tn_file6,tn_file7,tn_file8} = require('./trentinogpx');

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
  pm_file6, 6, 'general point', 6, 'general point','Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels.'],//endpoint:2 pointtable,strtpoint:3 pointtable
  ['Great War: from Malga Grassi to Rifugio Pernici',2.5,70,558,'Hiker','Trentino-Alto Adige','TN','Riva del Garda', 1,
  tn_file1,5,'Hut point',4,'Parking point','This is without doubt one of the most popular hiking trails in Garda Trentino. Short and not too hard, it leads to one of the busiest mountain huts in the area.'],
  [ 'Torre di Pisa',9.7,300,790,'Hiker','Trentino-Alto Adige','BZ','Nova Ponente',1,
  tn_file2,10,'general point',10,'general point','Loop hike between the spectacular Dolomite walls of the Latemar Massif. The tour takes its name from the leaning rock towers like the one in the Tuscan city.' ],
  [' The chromatic contrast of Corno Nero and Corno Bianco', 12.6,360,950,'Hiker','Trentino-Alto Adige','BZ','Aldino',1,
  tn_file3,11,'general point',11,'general point','Extremely panoramic hiking loop, which allows you to admire the Lagorai chain, the lower Val di Fiemme and to see the Val di Cembra in the distance. We are in Passo Oclini, where the road stops and you can only aim upwards towards the sky. The itinerary proposes the ascent of both peaks that frame the pass, but it is possible to go up just on one of them.'],
  [ '2 days in the mountains of Garda Trentino and 1 night in Rifugio Pernici',25.4,825,2086,'Professional Hiker','Trentino-Alto Adige','TN','Arco',1,
  tn_file4,15,'general point',15,'general point','Sleeping in a mountain hut is always a thrill. This excursion has an overnight stay in the mountains followed by a super panoramic hike back down to Riva del Garda'],
  [ ' Cima Cece',15.7,420,1100,'Professional Hiker','Trentino-Alto Adige','TN','Cavalese',1,
  tn_file5,19,'general point',19,'general point','The emotion of reaching the highest peak of the Lagorai.' ],
  ['The top trek in Garda Trentino', 6.2,180,470, 'Tourist','Trentino-Alto Adige','TN','Riva del Garda', 1,
  tn_file6,20,'general point',21,'general point','Ponale Trail is the best known and most popular in Garda Trentino: easy but at the same time spectacular as its winds sheer above the lake, a classic trek you cant afford to miss.'],
  ['Bosco Caproni and Trenches of Vastre', 5.5,140,221,'Tourist','Trentino-Alto Adige','TN','Riva del Garda', 1,
  tn_file7,5,'Parking point',5,'Parking point','A nature walk which in just a few kilometres manages to give a fascinating insight into the historical events which left their mark on Garda Trentino'],
  ['The forts of Monte Brione',6.3,180,320,'Tourist','Trentino-Alto Adige','TN','Riva del Garda', 1,
  tn_file8,22,'general point',22,'general point','An easy trek to explore the Austro-Hungarian border defences along the Sentiero della Pace or Peace Trail']

];

module.exports.hikevalues =   hikevalues;
