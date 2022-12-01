const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

let reverseGeoCoding = async (coordinates) => {
    const data = await ( await fetch(GEOCODE_URL+`${coordinates.longitude},${coordinates.latitude}`)).json();
    return data
}

let getCoordsDetails = async (coordinates) => {
    let details = await reverseGeoCoding(coordinates)
    return {...details.address, SubregionCode: provinceToCode[details.address.Subregion] ? provinceToCode[details.address.Subregion] : details.address.Subregion}
}

const provinceToCode = {  

    'Agrigento': 'AG',

    'Alessandria' : 'AL',

    'Ancona' : 'AN',

    'Aosta' : 'AO',

    'Arezzo' : 'AR',

    'Ascoli Piceno' : 'AP',

    'Asti' : 'AT',

    'Avellino' : 'AV',

    'Bari' : 'BA',

    'Barletta-Andria-Trani' : 'BT',

    'Belluno' : 'BL',

    'Benevento' : 'BN',

    'Bergamo' : 'BG',

    'Biella' : 'BI',

    'Bologna' : 'BO',

    'Bolzano' : 'BZ',

    'Brescia' : 'BS',

    'Brindisi' : 'BR',

    'Cagliari' : 'CA',

    'Caltanissetta' : 'CL',

    'Campobasso' : 'CB',

    'Carbonia-Iglesias' : 'CI',

    'Caserta' : 'CE',

    'Catania' : 'CT',

    'Catanzaro' : 'CZ',

    'Chieti' : 'CH',

    'Como' : 'CO',

    'Cosenza' : 'CS',

    'Cremona' : 'CR',

    'Crotone' : 'KR',

    'Cuneo' : 'CN',

    'Enna' : 'EN',

    'Fermo' : 'FM',

    'Ferrara' : 'FE',

    'Firenze' : 'FI',

    'Foggia' : 'FG',

    'Forlì-Cesena' : 'FC',

    'Frosinone' : 'FR',

    'Genova' : 'GE',

    'Gorizia' : 'GO',

    'Grosseto' : 'GR',

    'Imperia' : 'IM',

    'Isernia' : 'IS',

    'La Spezia' : 'SP',

    'L\'Aquila' : 'AQ',

    'Latina' : 'LT',

    'Lecce' : 'LE',

    'Lecco' : 'LC',

    'Livorno' : 'LI',

    'Lodi' : 'LO',

    'Lucca' : 'LU',

    'Macerata' : 'MC',

    'Mantova' : 'MN',
    
    'Massa-Carrara' : 'MS',

    'Matera' : 'MT',

    'Messina' : 'ME',

    'Milano' : 'MI',

    'Modena' : 'MO',

    'Monza e Brianza' : 'MO',

    'Napoli' : 'NA',

    'Novara' : 'NO',

    'Nuoro' : 'NU',

    'Olbia-Tempio': 'OT',

    'Oristano': 'OR',

    'Padova': 'PD',

    'Palermo': 'PA',

    'Parma': 'PR',

    'Pavia': 'PV',

    'Perugia': 'PG',

    'Pesaro e Urbino': 'PU',

    'Pescara': 'PE',

    'Piacenza': 'PC',

    'Pisa': 'PI',

    'Pistoia': 'PT',

    'Pordenone' : 'PN',

    'Potenza': 'PZ',

    'Prato' : 'PO',

    'Ragusa' : 'RG',

    'Ravenna': 'RA',

    'Reggio Calabria' : 'RC',

    'Reggio Emilia' : 'RE',

    'Rieti' : 'RI',

    'Rimini' : 'RN',

    'Roma' : 'RM',

    'Rovigo' : 'RO',

    'Salerno' : 'SA',

    'Medio Campidano' : 'VS',

    'Sassari' : 'SS',

    'Savona' : 'SV',

    'Siena' : 'SI',

    'Siracusa' : 'SR',

    'Sondrio' : 'SO',

    'Taranto' : 'TA',

    'Teramo' : 'TE',

    'Terni' : 'TR',

    'Torino' : 'TO',

    'Ogliastra' : 'OG',

    'Trapani' : 'TP',

    'Trento' : 'TN',

    'Treviso' : 'TV',

    'Trieste': 'TS',

    'Udine' : 'UD',

    'Varese' : 'VA',

    'Venezia' : 'VE',

    'Verbano-Cusio-Ossola' : 'VB',

    'Vercelli' : 'VC',

    'Verona' : 'VR',

    'Vibo Valentia' : 'VV',

    'Vicenza' : 'VI',

    'Viterbo' : 'VT',

  };

const codeToProvince = {  

    'AG' : 'Agrigento',

    'AL' : 'Alessandria',

    'AN' : 'Ancona',

    'AO' : 'Aosta',

    'AR' : 'Arezzo',

    'AP' : 'Ascoli Piceno',

    'AT' : 'Asti',

    'AV' : 'Avellino',

    'BA' : 'Bari',

    'BT' : 'Barletta-Andria-Trani',

    'BL' : 'Belluno',

    'BN' : 'Benevento',

    'BG' : 'Bergamo',

    'BI' : 'Biella',

    'BO' : 'Bologna',

    'BZ' : 'Bolzano',

    'BS' : 'Brescia',

    'BR' : 'Brindisi',

    'CA' : 'Cagliari',

    'CL' : 'Caltanissetta',

    'CB' : 'Campobasso',

    'CI' : 'Carbonia-Iglesias',

    'CE' : 'Caserta',

    'CT' : 'Catania',

    'CZ' : 'Catanzaro',

    'CH' : 'Chieti',

    'CO' : 'Como',

    'CS' : 'Cosenza',

    'CR' : 'Cremona',

    'KR' : 'Crotone',

    'CN' : 'Cuneo',

    'EN' : 'Enna',

    'FM' : 'Fermo',

    'FE' : 'Ferrara',

    'FI' : 'Firenze',

    'FG' : 'Foggia',

    'FC' : 'Forlì-Cesena',

    'FR' : 'Frosinone',

    'GE' : 'Genova',

    'GO' : 'Gorizia',

    'GR' : 'Grosseto',

    'IM' : 'Imperia',

    'IS' : 'Isernia',

    'SP' : 'La Spezia',

    'AQ' : 'L\'Aquila',

    'LT' : 'Latina',

    'LE' : 'Lecce',

    'LC' : 'Lecco',

    'LI' : 'Livorno',

    'LO' : 'Lodi',

    'LU' : 'Lucca',

    'MC' : 'Macerata',

    'MN' : 'Mantova',

    'MS' : 'Massa-Carrara',

    'MT' : 'Matera',

    'ME' : 'Messina',

    'MI' : 'Milano',

    'MO' : 'Modena',

    'MB' : 'Monza e della Brianza',

    'NA' : 'Napoli',

    'NO' : 'Novara',

    'NU' : 'Nuoro',

    'OT' : 'Olbia-Tempio',

    'OR' : 'Oristano',

    'PD' : 'Padova',

    'PA' : 'Palermo',

    'PR' : 'Parma',

    'PV' : 'Pavia',

    'PG' : 'Perugia',

    'PU' : 'Pesaro e Urbino',

    'PE' : 'Pescara',

    'PC' : 'Piacenza',

    'PI' : 'Pisa',

    'PT' : 'Pistoia',

    'PN' : 'Pordenone',

    'PZ' : 'Potenza',

    'PO' : 'Prato',

    'RG' : 'Ragusa',

    'RA' : 'Ravenna',

    'RC' : 'Reggio Calabria',

    'RE' : 'Reggio Emilia',

    'RI' : 'Rieti',

    'RN' : 'Rimini',

    'RM' : 'Roma',

    'RO' : 'Rovigo',

    'SA' : 'Salerno',

    'VS' : 'Medio Campidano',

    'SS' : 'Sassari',

    'SV' : 'Savona',

    'SI' : 'Siena',

    'SR' : 'Siracusa',

    'SO' : 'Sondrio',

    'TA' : 'Taranto',

    'TE' : 'Teramo',

    'TR' : 'Terni',

    'TO' : 'Torino',

    'OG' : 'Ogliastra',

    'TP' : 'Trapani',

    'TN' : 'Trento',

    'TV' : 'Treviso',

    'TS' : 'Trieste',

    'UD' : 'Udine',

    'VA' : 'Varese',

    'VE' : 'Venezia',

    'VB' : 'Verbano-Cusio-Ossola',

    'VC' : 'Vercelli',

    'VR' : 'Verona',

    'VV' : 'Vibo Valentia',

    'VI' : 'Vicenza',

    'VT' : 'Viterbo',

  };



export {calcCrow, codeToProvince, provinceToCode, getCoordsDetails}