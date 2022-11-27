'use strict';

var pointsvalues =
    [

        ['45.20353', '7.07734', '3538', 'Rocciamelone', 'Rocciamelone, Piedmont', 1],
        ['44.20647', '7.92800', '5300', 'La pianura dalle Alpi Liguri', 'Garessio, Cuneo, Piedmont', 2],
        ['44.23647', '7.95442', '3000', 'Bric Mindino', 'Garessio, Cuneo, Piedmont', 4],
        ['44.24354', '7.97038', '6900', 'Sentiero per il colle di prato rotondo', 'Garessio, Cuneo, Piedmont', 4],
        ['44.11270', '8.06636', '150', 'Colletta di Castelbianco', 'Castelbianco, Savona, Liguria', 5],
        ['44.14157', '8.23626', '122', 'Waypoint', 'via santa libera, Loano, Savona, Liguria', 6],
        ['44.14762', '8.23185', '3800', 'Chiesa di Santa Libera', 'Loano, Savona, Liguria', 6],
        ['44.19202', '7.91444', '4400', 'Colla Bassa', 'Garessio, Cuneo, Piedmont', 3],
        ['44.18839', '7.91141', '5500', 'Monte Antoroto', 'Garessio, Cuneo, Piedmont', 3],
        ['46.350742', '11.547654', '2016', 'Pampeago', 'Nova Ponente, Trentino', 8],
        ['46.347447', '11.453642', '1991', 'Passo Oclini', 'Aldino, Trentino', 9],
        ['46.334734', '11.454548', '2439', ' Val di Fiemme', 'Aldino, Trentino', 9],
        ['46.332893', '11.449606', '2320', 'il palone', 'Aldino, Trentino', 9],
        ['46.354273', '11.443903', '2313', 'corno bianco', 'Aldino, Trentino', 9],
        ['45.886605', '10.837807', '88', 'Riva del Garda', 'Arco Trentino', 10],
        ['45.919336', '10.795687', '90', 'Lift to the Bastione', 'Arco Trentino', 10],
        ['45.880036', '10.830686', '604', 'church santa Barbara', 'Arco Trentino', 10],
        ['45.884713', '10.835477', '226', 'il Bastoine', 'Arco Trentino', 10],
        ['46.289983', '11.645549', '1985', 'Valmaggiore', 'Cavalese Trentino', 11],
        ['45.883357', '10.83862', '70', 'power plant riva del garda', 'Riva del Garda Trentino', 12],
        ['45.850271', '10.823642', '530', 'Pregasina', 'Riva del Garda Trentino', 12],
        ['45.87738', '10.857294', '67', 'Porto San Nicolo', 'Riva del Garda Trentino', 14],
        ['45.877534', '10.862708', '145', 'Forti Monte Brione', 'Riva del Garda Trentino', 14],
        ['44.324216', '9.177575', '447', 'Pietre Strette', '', 15],
        ['44.321284', '9.186802', '434', 'Bocche', '', 15],
        ['44.307359', '9.200401', '179', 'La Cappelletta', '', 15],
        ['44.301324', '9.21121', '15', 'Chiesa di San Giorgio', '', 15],
        ['44.31023', '9.193915', '229', 'Prato', '', 15],
        ['44.311006', '9.180129', '220', 'Base Zero', '', 15],
        ['44.316391', '9.17515', '4', 'Abbazzia di San Fruttuoso', '', 15],
        ['44.316132', '9.175808', '45', 'Torre Doria', '', 15],
        ['44.326795', '9.168772', '613', 'Semaforo Vecchio - Cima Monte Portofino', '', 15],
        ['44.327663', '9.16815', '603', 'Punto Panoramico', '', 15],
        ['44.405595', '8.682782', '67', 'Partenza', '', 16],
        ['44.417822', '8.694169', '381', "Bric dell'Omo Punto Panoramico", '', 16],
        ['44.438258', '8.694429', '750', 'Casa ex Dazio', '', 16],
        ['44.438664', '8.687541', '847', 'Passo Tardie', '', 16],
        ['44.436928', '8.681704', '908', 'Monte Tardia di Ponente', '', 16],
        ['44.433106', '8.682445', '886', 'Riparo ai Belli Venti', '', 16],
        ['44.418444', '8.670954', '410', 'Strada del Centro Ornitologico Parco del Beigua', '', 16],
        ['43.856704', '7.967554', '1', 'Partenza', '', 17],
        ['43.850039', '7.956049', '9', 'Sentiero che costeggia la galleria', '', 17],
        ['43.855319', '7.941408', '208', 'Costarainera', '', 17],
        ['43.851331', '7.93109', '236', 'Cipressa', '', 17],
        ['43.84311', '7.916078', '20', 'Aregai', '', 17],
        ['43.993579', '8.152868', '355', 'Poggio Brea', '', 18],
        ['43.999499', '8.146419', '291', 'Ruderi Chiesa di San Bernardo', '', 18],
        ['44.011351', '8.139891', '421', 'Torre Pisana', '', 18],
        ['44.020599', '8.146618', '551', 'Santuario della Nostra Signora della Guardia', '', 18],
        ['44.028707', '8.163465', '594', 'Monte Pisciavino', '', 18],
        ['44.028414', '8.183125', '511', 'Monte Bignone', '', 18],
        ['44.017631', '8.190392', '169', 'Chiesa e punto panoramico di Santa Croce', '', 18],
        ['44.020619', '8.158997', '410', 'Torre di Vegliasco', '', 19],
        ['43.986787', '8.146612', '288', 'Località Casellone-Punto panoramico', '', 20],
        ['44.477167', '8.485580', '363', 'Partenza', '', 21],
        ['44.476121', '8.478845', '460', 'Castello Bellavista', '', 21],
        ['44.474885', '8.4678', '510', 'Casa Giumenta', '', 21],
        ['44.454942', '8.459211', '637', 'Passo Salmaceto', '', 21],
        ['44.601763', '9.037537', '459', 'Partenza', '', 22],
        ['44.603499', '9.035384', '531', 'Il Poggetto', '', 22],
        ['44.610685', '9.027315', '718', 'Sella Bricchetto', '', 22],
        ['44.603245', '9.030213', '538', 'Il Secchereccio', '', 22],
        ['44.603657', '9.027744', '552', 'Piazzola da Carbone', '', 22],
        ['44.604412', '9.026402', '547', 'Il Conglomerato', '', 22],
        ['44.607588', '9.026649', '514', 'Il Canyon della Val Vobbia', '', 22],
        ['44.610774', '9.021822', '495', 'Il Bosco Misto', '', 22],
        ['44.613464', '9.016262', '549', 'Castello di Vobbia', '', 22],
        ['45.872536', '7.617103', '1432.574', 'Partenza/Arrivo', '', 23],
        ['45.88112', '7.593634', '2177.2', 'Lago di Cignana', '', 23],
        ['45.87579', '7.593634', '2175.8', 'Cappella', '', 23],
        ['45.939602', '7.63072', '2023.5', 'Chiesetta Caduti Battaglione Alpini', '', 24],
        ['45.954298', '7.639575', '2538.6', 'Alpe Mont de l Eura', '', 24],
        ['45.866184', '7.72538', '1774.385', 'Partenza', '', 25],
        ['45.914058', '7.686803', '2981.221', 'Arrivo', '', 25],
        ['45.910428', '7.69033', '2806', 'Grand Lac', '', 25],
        ['45.915066', '7.687765', '2981', 'Colle Cime bianche', '', 25],
        ['45.686516', '7.690215', '820.3', 'Lago di Villa', '', 26],
        ['45.684867', '7.70045', '872.9', 'Castello di Villa', '', 26],
        ['45.679553', '7.69014', '909', 'Moint Saint Gilles', '', 26],
        ['45.799428', '7.659351', '2382', 'Colle della Portula', '', 27],
        ['45.788096', '7.663586', '2667', 'Monte Zerbion', '', 27],
        ['45.788334', '7.865921', '2479.3', 'Colle di Valdobbia', '', 28],
        ['45.785991', '7.876534', '2310', 'Lago della Balma', '', 28],
        ['45.658433', '7.600737', '2017', 'Lago di Leser', '', 29],
        ['45.649891', '7.59136', '2177', 'Lago Vallette', '', 29],
        ['45.666253', '7.579225', '1798', 'Lago della Selva', '', 29],
        ['45.861146', '7.549332', '2452.5', 'Bivacco', '', 30],
        ['45.861549', '7.549146', '2462.6', 'Lago tzan', '', 30],
        ['45.824894', '7.555939', '2204.1', 'Cervino', '', 30],

        ['39.338691', '16.442274', '1289.771938', 'Camigliatello', '', 31],
        ['39.380272', '16.558909', '1282.499480', 'Capanna del pastore', '', 32],
        ['39.376876', '16.556171', '1266.490037', 'Carbonaia nel Parco Nazionale della Calabria', '', 32],
        ['39.377874', '16.552505', '1230.908544', 'Bosco', '', 32],
        ['39.385000', '16.548282', '1172.149220', 'Parco Nazionale della Sila', '', 32],
        ['39.314674', '16.550270', '1408.597736', 'Train Station San Nicola - Silvana Mansio', '', 33],
        ['39.314571', '16.550510', '1407.318599', 'La Locomotiva Cafe', '', 33],
        ['39.339965', '16.446759', '1273.910210', 'Camigliatello Silano Train Station', '', 34],
        ['39.338691', '16.442274', '1289.771938', 'Camigliatello', '', 34],
        ['39.340835', '16.423989', '1312.788647', 'Fountain Moccone', '', 34],
        ['39.331856', '16.423597', '1387.772163', 'Stazione Cabinovia del Monte Curcio', '', 34],
        ['39.336251', '16.433790', '1346.190023', 'Fountain', '', 34],
        ['39.195638', '16.654930', '1311.804803', 'Lago Ampollino', '', 35],
        ['39.320882', '16.469445', '1400.651351', '', 'Via dei Pini Giganti', 36],
        ['39.324217', '16.467392', '1431.345724', 'Riserva I Giganti della Sila', '', 36],
        ['39.380272', '16.558909', '1282.499480', 'Capanna del pastore', '', 37],
        ['39.376876', '16.556171', '1266.490037', 'Carbonaia nel Parco Nazionale della Calabria', '', 37],
        ['39.377874', '16.552505', '1230.908544', 'Bosco', '', 37],
        ['39.385000', '16.548282', '1172.149220', 'Parco Nazionale della Sila', '', 37],
        ['39.334467', '16.140132', '574.33109', '', 'Via Uncino', 38],
        ['39.332082', '16.140367', '559.22955', 'Ponte Jumiceddre', '', 38],
        ['46.350791', '12.039860', '1320.037923', 'Tour dei viaz dei camorz dela Palaza persa', '', 39],
        ['46.354389', '12.030886', '1696.538346', 'Giardino alpino Antonio Segni', '', 39],
        ['46.328993', '12.149390', '1223.356963', 'Punto di passaggio sentiero 524', '', 40],
        ['46.323999', '12.139734', '1375.507988', 'Laghetto del Vach', '', 40],
        ['46.320566', '12.133601', '1680.154347', 'Baita Angelini', '', 40],
        ['46.321654', '12.146459', '1476.533108', 'Incrocio per il Viaz de l\'Ariosto', '', 40],
        ['46.342116', '12.150011', '1194.106939', 'Colcerver', '', 40],
        ['46.254708', '11.984030', '1087.630840', 'Frassenè', 'Viale della Vittoria, 219, 32020 Frassené, BL', 41],
        ['46.243623', '11.965754', '1721.855313', 'Voltago Agrodino', '', 41],
        ['46.350791', '12.039860', '1320.037923', 'Tour dei viaz dei camorz dela Palaza persa', '', 42],
        ['46.354389', '12.030886', '1696.538346', 'Giardino alpino Antonio Segni', '', 42],
        ['46.286291', '12.137649', '1936.438912', 'Forcella Moschesin', '', 43],
        ['46.289209', '12.140683', '1863.291032', 'Bel sentiero sotto Forcella Moschesin', '', 43],
        ['46.323958', '12.095348', '1627.525592', 'Passo Duran', '', 44],
        ['46.323999', '12.139734', '1372.144516', 'Laghetto del Vach', '', 44],
        ['Forcella', '46.319178', '12.045001', '1951.512271', '', 45],
        ['Forcella Sereje', '46.314687', '12.042224', '2015.895648', '', 45],

        //lombardia
        //hike1
        ['45.896702', '9.339937', '216', 'Partenza', '', 47],//start point/end point
        ['45.904642', '9.359321', '587', 'Cascata Del Cenghen', '', 47],//general point
        ['45.898251', '9.344000', '455', 'Monte Bordino', '', 47],//general point
        //hike2
        ['45.922778', '10.090556', '1600', 'Monte Scanapa', '', 48],//general point
        //hike3
        ['45.885661', '10.089305', '1498', 'La casa', '', 49],//start point/end point
        ['45.867660', '10.089998', '1720', 'Monte Alto', '', 49],//general point 
        //hike4
        ['45.887153', '9.798007', '1264', 'Bar al trapper', '', 50],//start/end point
        ['45.907897', '9.822292', '2041', 'Cima di Grem', '', 50],//general point
        //hike5
        ['45.808534', '9.054531', '403', '', 'Via Giuseppe Garibaldi', 51],//start/end point
        ['45.794055', '9.086058', '414', 'Castello di Baradello', 'Via Castel Baradello,5', 51],//general point
        ['45.803061', '9.060072', '395', 'Camera grande', '', 51],//general point 
        //hike6
        ['45.7953352', '9.167904', '398', '', 'Via Colombo 11', 52,],//start point/end point
        //hike7
        ['45.863460', '9.266290', '442', 'Piazzale Ponte Oscuro', '', 53],//start/end point
        ['45.861752', '9.266439', '438', '', 'Via Lazzaretom,6',53]// point

    ];
module.exports.pointsvalues = pointsvalues;