'use strict';


const { pm_file1, pm_file2, pm_file3, pm_file4, pm_file5, pm_file6 } = require('./hikes/piemontegpx');
const { tn_file1, tn_file2, tn_file3, tn_file4, tn_file5, tn_file6, tn_file7, tn_file8 } = require('./hikes/trentinogpx');
const { li_file1, li_file2, li_file3, li_file4, li_file5, li_file6, li_file7, li_file8 } = require('./hikes/liguriagpx');
const { va_file1, va_file2, va_file3, va_file4, va_file5, va_file6, va_file7, va_file8 } = require('./hikes/valledaostagpx');
const { ca_file1, ca_file2, ca_file3, ca_file4, ca_file5, ca_file6, ca_file7, ca_file8 } = require('./hikes/calabriagpx');
const { ven_file1, ven_file2, ven_file3, ven_file4, ven_file5, ven_file6, ven_file7, ven_file8 } = require('./hikes/venetogpx');
const { lo_file1, lo_file2, lo_file3, lo_file4, lo_file5, lo_file6, lo_file7, lo_file8 } = require('./hikes/lombardiagpx');
const {ve_h1_img, ve_h2_img, ve_h3_img, ve_h4_img, ve_h5_img, ve_h6_img, ve_h7_img, ve_h8_img} = require("./images/veneto/hikes/getImages.js");
const {ca_h1_img, ca_h2_img, ca_h3_img, ca_h4_img, ca_h5_img, ca_h6_img, ca_h7_img, ca_h8_img} = require("./images/calabria/hikes/getImages.js");
const {va_h1_img, va_h2_img, va_h3_img, va_h4_img, va_h5_img, va_h6_img, va_h7_img, va_h8_img} = require("./images/valledaosta/hikes/getImages.js");
const {pm_h1_img, pm_h2_img, pm_h3_img, pm_h4_img, pm_h5_img} = require("./images/piemonte/hikes/getImages.js");
const {li_h1_img, li_h2_img, li_h3_img, li_h4_img, li_h5_img, li_h6_img, li_h7_img, li_h8_img, li_h9_img} = require("./images/liguria/hikes/getImages.js");

let hikevalues =
  [
    ['Path to Rocciamelone', 9, 420, 1353, 'Professional Hiker', 'Piemonte', 'TO', 'Mompantero', 1,
      pm_file1, 1, 'general point', 1, 'Hut point', 'A well-known route, much loved by Valsusini and beyond. It is long and challenging because of the difference in height, but very well signposted and above all with a support point about halfway',pm_h1_img], //endpoint:1 pointtable,strtpoint:1 hut
    ['Ascesa al Rifugio Savona', 10.3, 244, 610, 'Hiker', 'Piemonte', 'CN', 'Garessio', 1,
      pm_file2, 1, 'Parking point', 1, 'Parking point', 'Intermediate Hiking Tour. Good fitness required. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot',pm_h2_img],//endpoint:1 parking,strtpoint:1 parking
    ['Salita al Monte Antoroto', 17, 444, 1090, 'Professional Hiker', 'Piemonte', 'CN', 'Garessio', 1,
      pm_file3, 1, 'Parking point', 1, 'Parking point', 'A part of this route comprises technical, difficult, or hazardous terrain. Specialist equipment and prior experience may be required',pm_h3_img],//endpoint:1 parking,strtpoint:1 parking
    ['Salita al Bric Mindino e al Colle di Prato Rotondo', 9.2, 218, 610, 'Hiker', 'Piemonte', 'CN', 'Garessio', 1,
      pm_file4, 2, 'Parking point', 2, 'Parking point', 'Intermediate Hiking Tour. Good fitness required. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot.',pm_h4_img],//endpoint:2 parking,strtpoint:2 parking
    ['Colletta di Castelbianco Loop from Veravo', 5.7, 105, 206, 'Tourist', 'Liguria', 'SV', 'Castelbianco', 1,
      pm_file5, 3, 'Parking point', 3, 'Parking point', 'Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels. The starting point of the Tour is right next to a parking lot.', li_h9_img],//endpoint:3 parking,strtpoint:3 parking
    ['Chiesa di Santa Libera Loop from Losano', 4.6, 80, 122, 'Tourist', 'Piemonte', 'TO', 'Frailino', 1,
      pm_file6, 6, 'general point', 6, 'general point', 'Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels.',pm_h5_img],//endpoint:2 pointtable,strtpoint:3 pointtable
    ['Great War: from Malga Grassi to Rifugio Pernici', 2.5, 70, 558, 'Hiker', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 1,
      tn_file1, 5, 'Hut point', 4, 'Parking point', 'This is without doubt one of the most popular hiking trails in Garda Trentino. Short and not too hard, it leads to one of the busiest mountain huts in the area.'],
    ['Torre di Pisa', 9.7, 300, 790, 'Hiker', 'Trentino-Alto Adige', 'BZ', 'Nova Ponente', 1,
      tn_file2, 10, 'general point', 10, 'general point', 'Loop hike between the spectacular Dolomite walls of the Latemar Massif. The tour takes its name from the leaning rock towers like the one in the Tuscan city.'],
    ['The chromatic contrast of Corno Nero and Corno Bianco', 12.6, 360, 950, 'Hiker', 'Trentino-Alto Adige', 'BZ', 'Aldino', 1,
      tn_file3, 11, 'general point', 11, 'general point', 'Extremely panoramic hiking loop, which allows you to admire the Lagorai chain, the lower Val di Fiemme and to see the Val di Cembra in the distance. We are in Passo Oclini, where the road stops and you can only aim upwards towards the sky. The itinerary proposes the ascent of both peaks that frame the pass, but it is possible to go up just on one of them.'],
    ['Two days in the mountains of Garda Trentino and one night in Rifugio Pernici', 25.4, 825, 2086, 'Professional Hiker', 'Trentino-Alto Adige', 'TN', 'Arco', 1,
      tn_file4, 15, 'general point', 15, 'general point', 'Sleeping in a mountain hut is always a thrill. This excursion has an overnight stay in the mountains followed by a super panoramic hike back down to Riva del Garda'],
    ['Cima Cece', 15.7, 420, 1100, 'Professional Hiker', 'Trentino-Alto Adige', 'TN', 'Cavalese', 1,
      tn_file5, 19, 'general point', 19, 'general point', 'The emotion of reaching the highest peak of the Lagorai.'],
    ['The top trek in Garda Trentino', 6.2, 180, 470, 'Tourist', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 1,
      tn_file6, 20, 'general point', 21, 'general point', 'Ponale Trail is the best known and most popular in Garda Trentino: easy but at the same time spectacular as its winds sheer above the lake, a classic trek you cant afford to miss.'],
    ['Bosco Caproni and Trenches of Vastre', 5.5, 140, 221, 'Tourist', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 1,
      tn_file7, 5, 'Parking point', 5, 'Parking point', 'A nature walk which in just a few kilometres manages to give a fascinating insight into the historical events which left their mark on Garda Trentino'],
    ['The forts of Monte Brione', 6.3, 180, 320, 'Tourist', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 1,
      tn_file8, 22, 'general point', 22, 'general point', 'An easy trek to explore the Austro-Hungarian border defences along the Sentiero della Pace or Peace Trail'],
    ['Portofino e San Fruttuoso da Gaixella', 17.48, 344, 1143, 'Tourist', 'Liguria', 'GE', 'Portofino', 1,
      li_file1, 7, 'Parking point', 7, 'Parking point', 'Nice and easy hike through some of the nicest towns in Liguria. You can climb hills while looking at the sea', li_h1_img],
    ['Parco Naturale del Beigua.Il Monte Tardia da Arenzano', 14.2, 352, 933, 'Hiker', 'Liguria', 'GE', 'Arenzano', 1,
      li_file2, 34, 'general point', 34, 'general point', 'Challenging hike that takes you into the depth of Parco Nazionale del Beigua, almost riching the peak of Monte Tardia', li_h2_img],
    ['San Lorenzo al Mare-Costarainera-Cipressa-Aregai-S. Lorenzo al Mare', 15.91, 262, 274, 'Tourist', 'Liguria', 'IM', 'San Lorenzo al Mare', 1,
      li_file3, 41, 'general point', 41, 'general point', 'Walk through some of the nicest coasts in Liguria', li_h3_img],
    ['Il Grande Anello di Alassio-Tra mare e monti', 19.36, 447, 1098, 'Tourist', 'Liguria', 'SV', 'Alassio', 1,
      li_file4, 8, 'Parking point', 8, 'Parking point', 'Discover the beatiful city of Alassio and its surroundings', li_h4_img],
    ['Torre Pisana, Santuario della Guardia e Torre di Vegliasco. Anello da Alassio.', 11.41, 284, 639, 'Tourist', 'Liguria', 'SV', 'Alassio', 1,
      li_file5, 8, 'Parking point', 8, 'Parking point', 'A nice walk with hidden gems like a great restaurant in a road curve, a love path where walls have inscriptions dating back from 56 b.C.', li_h5_img],
    ['Alassio, San Bernardo, Poggio Brea, Laigueglia, Metta, Torre Pisana e Moglio', 17.01, 400, 820, 'Tourist', 'Liguria', 'SV', 'Alassio', 1,
      li_file6, 8, 'Parking point', 8, 'Parking point', 'A long but wonderful hike on the mountains of Alassio', li_h6_img],
    ['La Foresta della Deiva(Il sentiero Natura)', 14.22, 216, 482, 'Hiker', 'Liguria', 'SV', 'Sassello', 1,
      li_file7, 55, 'general point', 55, 'general point', 'A very rich in panoramic views and well marked hike through the Deiva Forest', li_h7_img],
    ['Castello della Pietra e Sella Bricchetto da Vobbia', 11.11, 183, 663, 'Hiker', 'Liguria', 'GE', 'Vobbia', 1,
      li_file8, 59, 'general point', 59, 'general point', 'Easy hike for everyone that takes you to the Castello della Pietra, a real gem of this area', li_h8_img],

    ['Valtournenche - Lago di Cignana', 10.03, 340, 796, 'Hiker', "Valle d'Aosta", 'AO', 'Fontanaz-Valmartin', 1,
      va_file1, 68, 'general point', 68, 'general point', 'Great route for hiking lovers with a beatiful lake to see',va_h1_img],
    ['Cervinia - Cappella Battaglione Alpini Sciatori Monte Cervino -Rifugio Duca degli Abruzzi all Oriondé', 19.04, 420, 832, 'Hiker', "Valle d'Aosta", 'AO', 'Breuil-Cervinia', 1,
      va_file2, 9, 'Parking point', 9, 'Parking point', 'Excellent ring route with a refuge where you can refresh yourself and spend the night',va_h2_img],
    ['Cime - Bianche', 8.1, 233, 1293, 'Tourist', "Valle d'Aosta", 'AO', 'San Giacomo', 1,
      va_file3, 73, 'general point', 74, 'general point', 'Beautiful route with an amazing view of white mountains, good also for beginners',va_h3_img],
    ['Lac e Château De Villa, Mont Saint Gilles e Belvedere da Torille', 11.86, 288, 770, 'Tourist', "Valle d'Aosta", 'AO', 'Torille-Rivarolla', 1,
      va_file4, 10, 'Parking point', 10, 'Parking point', 'Great ring route even for beginners with many panoramic spots and things to view',va_h4_img],
    ['Monte Zerbion da Antagnod', 8.51, 140, 996, 'Tourist', "Valle d'Aosta", 'AO', 'Lignod', 1,
      va_file5, 11, 'Parking point', 11, 'Parking point', 'Easy route that allows you to reach the top of Mount Zerbion, one of the most popular destinations in the Val D Ayas',va_h5_img],
    ['Ospizio Sottile, Colle Valdobbia e lago della Balma da Gressoney Saint Jean', 12.27, 344, 1252, 'Tourist', "Valle d'Aosta", 'AO', 'Gressoney-Saint-Jean', 1,
      va_file6, 12, 'Parking point', 12, 'Parking point', 'Really good path with many things to view, suitable for beginners',va_h6_img],
    ['Parco del Monte Avic: Rifugio Barbustel da Covarey', 16.37, 404, 970, 'Hiker', "Valle d'Aosta", 'AO', 'Covarey', 1,
      va_file7, 13, 'Parking point', 13, 'Parking point', 'This park is one of the most popular destinations for hikers in Valle d Aosta',va_h7_img],
    ['Summer Park - Bivacco Tzan - Lago Tzan ', 20.9, 346, 871, 'Hiker', "Valle d'Aosta", 'AO', 'Septumian', 1,
      va_file8, 14, 'Parking point', 14, 'Parking point', 'Good ring route starting from the Summer Park, in the path you can stop to watch the beatiful Tzan lake',va_h8_img],

    ['Camigliatello Loop from Camigliatello Silano', 4.08, 77, 110, 'Hiker', 'Calabria', 'CS', 'Spezzano della Sila', 1,
      ca_file1, 15, 'Parking point', 15, 'Parking point', 'Intermediate Hiking Tour. Great for any fitness level. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot.', ca_h1_img],
    ['Bosco – Parco Nazionale della Sila Loop from Campo San Lorenzo, Easy', 4.70, 90, 140, 'Hiker', 'Calabria', 'CS', 'Spezzano della Sila', 1,
      ca_file2, 16, 'Parking point', 16, 'Parking point', 'Intermediate Hiking Tour. Great for any fitness level. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot.', ca_h2_img],
    ['La Locomotiva Cafe Loop from San Nicola-Silvana Mansio', 7.64, 132, 190, 'Hiker', 'Calabria', 'CS', 'Casali del Manco', 1,
      ca_file3, 95, 'general point', 95, 'general point', 'Intermediate Hiking Tour. Good fitness required. Easily-accessible paths. Suitable for all skill levels. The starting point of the Tour is accessible with public transport.', ca_h3_img],
    ['Camigliatello – Acqua Loop from Camigliatello Silano', 6.36, 109, 150, 'Tourist', 'Calabria', 'CS', 'Spezzano della Sila', 1,
      ca_file4, 97, 'general point', 97, 'general point', 'Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels. The starting point of the Tour is accessible with public transport.', ca_h4_img],
    ['Lago Ampollino Loop from Villaggio Baffa', 4.97, 84, 100, 'Tourist', 'Calabria', 'KR', 'Caprara', 1,
      ca_file5, 17, 'Hut point', 17, 'Hut point', 'Easy hike. Great for any fitness level. Easily-accessible paths. Suitable for all skill levels.', ca_h5_img],
    ['Riserva I Giganti della Sila Loop from Croce di Magara', 1.57, 33, 40, 'Hiker', 'Calabria', 'CS', 'Spezzano Piccolo', 1,
      ca_file6, 103, 'general point', 103, 'general point', 'Intermediate Hiking Tour. Great for any fitness level. Mostly accessible paths. Sure-footedness required.', ca_h6_img],
    ['Bosco – Parco Nazionale della Sila Loop from Campo San Lorenzo, Hard', 18.6, 391, 480, 'Professional Hiker', 'Calabria', 'CS', 'Spezzano della Sila', 1,
      ca_file7, 16, 'Parking point', 16, 'Parking point', 'Expert Hiking Tour. Very good fitness required. Mostly accessible paths. Sure-footedness required. The starting point of the Tour is right next to a parking lot.', ca_h7_img],
    ['San Fili Loop', 5.7, 117, 292, 'Hiker', 'Calabria', 'CS', 'San Fili', 1,
      ca_file8, 109, 'general point', 109, 'general point', 'It starts from San Fili and follows part of the path of San Francesco da Paola to then intersect with the path that runs along the Emoli stream and then returns to the starting point.', ca_h8_img],


    ['Giardino alpino Antonio Segni – Rifugio Mario Vazzoler ', 8.77, 239, 570, 'Hiker', 'Veneto', 'BL', 'Taibon Agrodino', 1, ven_file1, 17, 'Parking point', 17, 'Parking point', 'Intermediate hiking route. Good training required. Mostly accessible trails. Safe walking pace required. Tour starting point is near a parking lot.', ve_h1_img],
    ['Laghetto del Vach – Colcerver Itinerario ad anello da Ligont', 11.3, 269, 710, 'Professional Hiker', 'Veneto', 'BL', 'Val di Zoldo', 1, ven_file2, 18, 'Parking point', 18, 'Parking point', 'Hiking route for experts. Good training required. Sure-footedness, sturdy footwear and mountaineering experience required.', ve_h2_img],
    ['Col di Luna Itinerario ad anello da Voltago Agordino', 12.9, 297, 770, 'Hiker', 'Veneto', 'BL', 'Voltago Agrodino', 1, ven_file3, 118, 'general point', 118, 'general point', 'Intermediate hiking route. Good training required. Mostly accessible trails. Safe walking pace required. Tour starting point and accessible by public transportation.', ve_h3_img],
    ['Giardino alpino Antonio Segni  – Rifugio Mario Vazzoler Itinerario ad anello da Listolade (Ristolade)', 12.3, 312, 730, 'Professional Hiker', 'Veneto', 'BL', 'Taibon Agrodino', 1, ven_file4, 17, 'Parking point', 17, 'Parking point', 'Hiking route for experts. Good training required. Mostly accessible trails. Safe walking pace required. Tour starting point is near a parking lot.', ve_h4_img],
    ['Malga di Pramper – Forcella Moschesin Itinerario ad anello da Villaggio Baron', 16.9, 446, 1110, 'Professional Hiker', 'Veneto', 'BL', 'Forno di Zoldo', 1, ven_file5, 20, 'Hut point', 20, 'Hut point', 'Hiking route for experts. Good training required. Sure-footedness, sturdy footwear and mountaineering experience required.', ve_h5_img],
    ['Passo Duran Itinerario ad anello da Fusine', 5.32, 99, 190, 'Hiker', 'Veneto', 'BL', 'La Valle Agordina', 1, ven_file6, 23, 'Hut point', 23, 'Hut point', "Intermediate hiking route. Suitable for all training levels. Mostly accessible trails. Surefootedness required.", ve_h6_img],
    ['Laghetto del Vach – Itinerario ad anello da Ligont', 7.28, 147, 380, 'Hiker', 'Veneto', 'BL', 'Val di Zoldo', 1, ven_file7, 18, 'Parking point', 18, 'Parking point', 'Intermediate hiking route. Good training required. Easily passable trails. Suitable for all skill levels.', ve_h7_img],
    ['Forcella – Forcella Sejere Itinerario ad anello da Còi di Pèden', 8.77, 227, 590, 'Hiker', 'Veneto', 'BL', 'Agrodo', 1, ven_file8, 19, 'Parking point', 19, 'Parking point', 'Intermediate hiking route. Good training required. Mostly accessible trails. Safe walking pace required.', ve_h8_img],

    //hike1:
    ['Ritorno alla Cascata Del Cenghen alle Falesie dei Campelli ', 10.28, 159, 715, 'Tourist', 'Lombardia', 'LC', 'Abbadia Lariana', 1,
      lo_file1, 128, 'general point', 128, 'general point', 'A quiet and relaxing path, suitable for all seasons.'],
    //hike2:
    ['Cantoniera della presolana monte scanapa malga lantana colle', 13.09, 412, 596, 'Tourist', 'Lombardia', 'BG', 'Colere', 1,
      lo_file2, 26, 'Hut point', 26, 'Hut point', 'Woods, meadows, beautiful panoramas and a fabulous view of the Presolana.'],
    //hike3:
    ['Baita Termen-Rifugio Pian della Palù-Monte Alto-Rifugio Leonida Magnolini', 7.91, 200, 270, 'Tourist', 'Lombardia', 'BG', 'Castione della Presolana', 1,
     lo_file3, 132, 'general point', 132, 'general point', 'Scenic routes with little difference in elevation.'],
    //hike4
    ['Verceia valle dei ratti posteggio casten frasnedo rifugio frasne', 14.52, 343, 961, 'Hiker', 'Lombardia', 'BG', 'Oneta', 1,
      lo_file4, 134, 'general point', 134, 'general point', 'Some stretches are also exposed in the final part of the descent in the woods.'],
    //hike5
    ['Passeggiata pomeridiana nel Parco Regionale Spina Verde', 10.13, 163, 440, 'Tourist', 'Lombardia', 'CO', 'San Fermo della Battaglia', 1,
     lo_file5, 136, 'general point', 136, 'general point', 'Nice ride, there are some very beautiful viewpoints over Como, the path in the woods is cool'],
    //hike6
    ['Monti Boletto, Dosmat e Bolettone da Albese', 15.77, 336, 1078, 'Tourist', 'Lombardia', 'CO', 'Albese Con Cassano', 1,
      lo_file6, 139, 'general point', 139, 'general point', 'The paths and dirt roads I traveled do not present particular technical difficulties.'],
    //hike7
    ['Monte Barzaghino, Croce di Pizzallo, la Selva e i Fungi di Rezzago. Anello da Asso', 12.05, 326, 827, 'Hiker', 'Lombardia', 'CO', 'Asso', 1,
      lo_file7, 140, 'general point', 140, 'general point', 'Recommended for anyone who wants to walk in the woods and be well trained in climbing and descending.'],
    //hike8
    ['Rifugio Grassi anello da Introbio', 17.43, 432, 1563, 'Hiker', 'Lombardia', 'LC', 'Introbio', 1,
      lo_file8, 30, 'Hut point', 30, 'Hut point', 'Easy trails, but very tiring']
  ];

module.exports.hikevalues = hikevalues;
