'use strict';
const {ve_hut1_img, ve_hut2_img, ve_hut3_img, ve_hut4_img, ve_hut5_img, ve_hut6_img, ve_hut7_img} = require("./images/veneto/huts/getHutImages.js");
const {ca_hut1_img, ca_hut2_img} = require("./images/calabria/huts/getHutImages.js");
const {va_hut1_img, va_hut2_img, va_hut3_img } = require("./images/valledaosta/huts/getHutImages.js");
const {pm_hut1_img, pm_hut2_img, pm_hut3_img, pm_hut4_img} = require("./images/piemonte/huts/getHutImages");
const {li_hut1_img} = require("./images/liguria/huts/getHutImages.js");
const {tn_hut1_img, tn_hut2_img, tn_hut3_img, tn_hut4_img, tn_hut5_img, tn_hut6_img, tn_hut7_img, tn_hut8_img} = require("./images/trentino/huts/getHutImages.js");
const {lo_hut1_img, lo_hut2_img, lo_hut3_img, lo_hut4_img, lo_hut5_img} = require("./images/lombardia/huts/getHutImages.js");
let hutsvalues =
    [


        ['La Riposa', '45.17778', '7.08337', '2185', 'Refuge', 'Piemonte', 'TO', 'Mompantero', 20, "+39 0122 675173",'rifugio.lariposa22@gmail.com', 'The Rifugio La Riposa is located in the locality of Riposa, Mompantero di Susa, at an altitude of 2185 m and can also be reached by car.',pm_hut1_img],
        ["Ca' d'Asti", '45.19177', '7.07427', '2854', 'Refuge', 'Piemonte', 'TO', 'Mompantero', 15, "+39 0122 33192",'rifugiocadasti@libero.it', 'the refuge was built on the site where Bonifacio Rotario dAsti , who had first climbed the summit of Rocciamelone in 1358 , had built a shelter',pm_hut2_img],
        ['Savona', '44.19940', '7.93339', '2600', 'Refuge', 'Piemonte', 'CN', 'Garessio', 10, "+39 0174 803707",'info@caisavona.it', 'Short access itinerary to the Savona refuge, perhaps preferable in summer to the one that climbs from Valdinferno, due to the possibility of carrying out the entire climb inside a cool beech forest.',pm_hut3_img],
        ['Gallo di monte', '44.21736', '7.94432', '1392', 'Refuge', 'Piemonte', 'CN', 'Garessio', 8, "+39 338 158 6878", undefined, 'simple, well-kept and well managed, Always open in the months July August and on weekends in other periods.',pm_hut4_img],
        ['Nino Pernici', '45.92658', '10.76875', '1595', 'Refuge', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 23, "+39 0464 505090",'rifugiopernici@hotmail.it', 'ThePernici refugeis located in the mountains between Lake Garda and the Ledro valley, in a splendid panoramic position at 1600 meters above sea level. Easily accessible from several accesses, it offers typical cuisine and bar service.', tn_hut1_img],
        ['Capanna Grassi', '45.92', '10.78', '1043', 'Malga', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', 12, "+39 0464 501181",'malgagrassi@gmail.com', 'A few steps from Riva del Garda.Opens from 8:30', tn_hut2_img],
        ['Ganischger Alm', '46.351153', '11.546513', '2011', 'Restaurant', 'Trentino-Alto Adige', 'BZ', 'Nova Ponente', undefined, "+39 328 2259537",'info@ganischgeralm.com', 'located in the heart of the skiing and hiking area Latemar Obereggen, in a sunny location with 360 degrees panoramic view of the fantastic mountains of the Dolomites.', tn_hut3_img],
        ['Cugola Alta', '46.324238', '11.436287', '1894', 'Malga', 'Trentino-Alto Adige', 'BZ', 'Aldino', undefined, undefined, undefined, 'an unmanaged hut in the Fiemme Valley Alps, but is available for self-catering. It is easiest to reach from Jochgrimm via the Passo Cugola', tn_hut4_img],
        //TODO: rifugio capanna duplicates from rifugio capanna grassi Bocca diTrat duplicates too
        ['Capanna', '45.921558', '10.784562', '1080', 'Refuge', 'Trentino-Alto Adige', 'TN', 'Arco', 12, undefined, undefined, 'An overview on Riva del Garda.', tn_hut5_img],
        ['Bocca Di Trat', '45.92659', '10.76872', '1598', 'Refuge', 'Trentino-Alto Adige', 'TN', 'Arco', 15, undefined, undefined, 'The spires of the Guglie di Pichea resemble a stone castle and the Rifugio Bocca di Trat “Nino Pernici” has the appearance of guardhouse in an area of enormous strategic importance for the defence of the Upper Garda during the Great War', tn_hut6_img],
        ['Valmaggiore', '46.291392', '11.646566', '1610', 'Malga', 'Trentino-Alto Adige', 'TN', 'Cavalese', 10, "+39 329 8547451", undefined, 'A typical restaurant in the magnificent scenery of Valmaggiore, the malga offers traditional Trentino cuisine and house dishes', tn_hut7_img],
        ['Ponale Alto Belvedere', '45.864402', '10.833777', '145', 'Restaurant', 'Trentino-Alto Adige', 'TN', 'Riva del Garda', undefined, "+39 0464 567321",'ponalesrl@gmail.com', 'The restaurant is located on the road of the "ponale", unique and fabulous path. It starts from Riva del Garda, a town overlooking Lake Garda.', tn_hut8_img],
        ['Molini', '44.31912', '9.178627', '232', 'Agririfugio', 'Liguria', 'GE', 'Fruttuoso', 11, "+39 0185 772291",'info@agririfugiomolini.it', 'Set on a hillside overlooking the Ligurian coast, this quiet, secluded farmhouse within Portofino Natural Park is only accessible via hiking trails.', li_hut1_img],
        ['Barmasse', '45.87579', '7.593994', '2174.2', 'Refuge', "Valle d'Aosta", 'AO', 'Fontanaz-Valmartin', 25, "+39 375 687 51 14",'prenotazioni@rifugiocuney.it', 'The refuge is an excellent point of reference for summer excursions, mountain biking, lake fishing and loop trekking.',va_hut1_img],
        ['Duca degli Abruzzi all Oriondè', '45.958891', '7.6441', '2798.2', 'Refuge', "Valle d'Aosta", 'AO', 'Breuil-Cervinia', 22, "+39 349 3665318",'info@rifugiorionde.it', 'The comfort and treatment are excellent, it will feel like staying in a small hotel',va_hut2_img],
        ['Barbustel', '45.649148', '7.588452', '2188', 'Refuge', "Valle d'Aosta", 'AO', 'Covarey', 40, "+39 0166 510001", undefined, 'The refuge is located at 2200 m near the Blanc, Noir, Cornu and Vallette lakes. At lunch you can eat typical Aosta Valley cuisine.',va_hut3_img],

        ['Il Brigante', '39.197330', '16.658432', '1318.757023', 'Hotel', 'Calabria', 'KR', 'Caprara', 34, "+39 0962493816", 'info@hotelilbrigante.it', 'Hotel il Brigante is located inside the Palumbo Village, in the heart of the Sila Piccola, near the enchanting scenery of Lake Ampollino.', ca_hut1_img],
        ['Villaggio Baffa', '39.195780', '16.669220', '1320', 'Hotel', 'Calabria', 'KR', 'Cotronei', 28, "+39 0962 46102",'massimobaffa@libero.it', 'Villaggio Baffa is an excellent combination for short or long stays and at any time of the year.', ca_hut2_img],

        ['Mario Vazzoler', '46.353972', '12.031167', '1695.967733', 'Refuge', 'Veneto', 'BL', 'Taibon Agourdino', 50, "+39 0437660008",'rifugiovazzoler@gmail.com', 'Rifugio Mario Vazzoler is located at the foot of the Venezia and Trieste Towers of the Civetta Group. It is a very peaceful and surprising place.', ve_hut1_img],
        ['Giovanni Angelini', '46.326333', '12.174882', '1586.367382', 'Refuge', 'Veneto', 'BL', 'Forno di Zoldo', 22, "+39 3279750778",'rifugiosoralsass@gmail.com', 'The hut is located in the most atmospheric setting, at the edge of a clearing on the wooded plateau of the imposing Spiz di Mezzodì. \nThe building is rather small but graceful, cozy, on a human scale and in perfect harmony with the surrounding landscape. \nAn hour\'s walk away is the "belvedere," one of the best vantage points in Val di Zoldo with round-the-horizon views of numerous Dolomite peaks. \nIt is the starting point for ascents in the northern sector of the Spiz and the first stop along the route of the Zoldo Ring. \nAppreciated quality of cuisine and wine cellar.', ve_hut2_img],
        ['Pramper', '46.303105', '12.150688', '1557.158213', 'Malga', 'Veneto', 'BL', 'Forno di Zoldo', undefined, "+39 329 7862899", 'malga.pramper@gmail.com', 'Malga Pramper (1540 m) is located in the valley of the same name on the slopes of Mount Pramper and within the Belluno Dolomites National Park, in the municipality of Forno di Zoldo. The recently renovated malga is also a farmhouse with restaurant services, sale of dairy products, bed&breakfast and dinners by reservation.\nThe structure, made of masonry with a wooden roof, has a shuttle that leaves from Pian de La Fopa, every day in August, only on weekends in July and September.\nSurrounded by green pastures, it can also be reached on foot and by MTB and allows for various excursions, including snowshoeing and ski touring in winter.\nThe malga is accessible on foot by following CAI path 523 in about an hour\'s walk, starting from the convenient parking area in Pian de La Fopa, which can be reached by asphalt and dirt road (about 4 km) from the center of Forno di Zoldo, about 40 km from Belluno. A shuttle service from Pian de La Fope also operates.', ve_hut3_img],
        ['Sommariva al Pramperet', '46.288855', '12.163453', '1847.450375', 'Refuge', 'Veneto', 'BL', 'Forno di Zoldo', 25, "+39 0437 1956153",'info@rifugiosommarivaalpramperet.it', 'The Sommariva Refuge at Pramperet is one of the last alpine lodges that touches the Alta Via delle Dolomiti 1, but it can also be the perfect destination for a Sunday hike. Traditional dishes can be enjoyed here.', ve_hut4_img],
        //sgranata
        ['Passo Duran "C.Tomè"', '46.324105', '12.095378', '1627.525592', 'Refuge', 'Veneto', 'BL', 'La Valle Agordina', 25, "+39 349 684 8307",'info@rifugiopassoduran.it', 'The Sommariva Refuge at Pramperet is one of the last alpine lodges that touches the Alta Via delle Dolomiti 1, but it can also be the perfect destination for a Sunday hike. Traditional dishes can be enjoyed here.', ve_hut5_img],
        //sgranata
        ['Bruto Carestiato', '46.321342', '12.070563', '1797.258522', 'Refuge', 'Veneto', 'BL', 'Agordo', 28, "+39 0437 62949",'info@rifugiocarestiato.com', 'Rifugio Bruto Carestiato is located 1,834 meters above sea level. It was built after World War II and named after Bruto Carestiato, a young man who died climbing a route on Civetta.', ve_hut6_img],
        ['Casera del Camp', '46.32289', '12.04339', '1847.074055', 'Bivouac', 'Veneto', 'BL', 'Agordo', 44, "+39 330 722855",'az.agr.frigimelica.giacomo@gmail.com', 'Very spacious bivouac, equipped with stove but no beds/mattresses', ve_hut7_img],

        ['Pineta', '45.929233', '10.097330', '1260', 'Hotel', 'Lombardia', 'BG', 'Castione della Presolana', 46, "+39 0346 31121",'info@albergopineta.net', "Set in a quiet pine forest in Castione della Presolana, Hotel Pineta offers mountain views and free Wi-Fi in public areas.", lo_hut1_img],//start point/end point:
        ['Grassi', '46.009541', '9.491672', '1995', 'Refuge', 'Lombardia', 'LC', 'Introbio', 50, "+39 339 493 1340",'info@rifugiograssi.it', 'Good refuge and friendly staff', lo_hut2_img], //hut point
        ['Casa Alpina Pio X', '46.015696', '9.477188', '1699', 'Refuge', 'Lombardia', 'LC', 'Introbio', 20, "+39 0341 284774", undefined, 'Excellent holiday, mountain home but with all the comforts', lo_hut3_img],//hut point
        ['Baita Partrizi', '45.827348', '9.172940', '928', 'Refuge', 'Lombardia', 'BG', 'Carvico', 66,'+39 031 622550', undefined, 'The former hut Baita Patrizi (closed since 2017) is located in a wood on the southern slope of Monte Bolettone.', lo_hut4_img],//hut point
        ['La Cascata', '45.976641', '9.453202', '631', 'Restaurant', 'Lombardia', 'LC', 'Introbio', undefined, "+39 0825849549",'ristorante.lacascata@libero.it', 'A very good restaurant.',lo_hut5_img],//start point/ end point
    ];
module.exports.hutsvalues = hutsvalues;