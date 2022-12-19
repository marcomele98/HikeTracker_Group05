const start_point = {
    "latitude": "45.20353",
    "longitude": "7.07734",
    "altitude": "3500.161133",
    "name": "prova",
    "address": "prova"
}

exports.hike = {
    "title": "ROCCIAMELONE",
    "length_kms": 9,
    "expected_mins": 420,
    "ascendent_meters": 3538,
    "difficulty": "Professional Hiker",
    "region": "Piemonte",
    "province": "TO",
    "city": "Mompantero",
    "gpx": "gpx content",
    "description": "a beautiful hike",
    "end_point": {
        "latitude": "45.20353",
        "longitude": "7.07734",
        "altitude": "3500.161133",
        "name": "prova",
        "address": "prova"
    },
    "start_point": start_point,
    "reference_points": [{
        "latitude": "45.189032",
        "longitude": "7.076255",
        "altitude": "2693.187012",
        "name": "prova",
        "address": "prova"
    },
    {
        "latitude": "45.184339",
        "longitude": "7.078848",
        "altitude": "2386.516113",
        "name": "prova",
        "address": "prova"
    }]
}

exports.hike_wrong = {
    ...this.hike,
    "start_point": {
        ...start_point,
        "latitude": "ciao", 
    }
}

exports.hike_wrong_2 = {
    ...this.hike,
    "expected_mins": "ciao",
}



exports.updateEnd = {
    'end_point' : 1 ,
    'type_end' : 'Hut point'
}

exports.updateEnd1 = {
    'end_point' : 1 ,
    'type_end' : 'Parking point'
}

exports.updateStart = {
    'start_point' : 1 ,
    'type_start' : 'Hut point'
}

exports.updateStart1 = {
    'start_point' : 1 ,
    'type_start' : 'Parking point'
}

exports.hikeStartDates ={
    'date_time' : '2022-11-16 12:00:00'
}

exports.hikeEndDates ={
    'date_time' : '2022-11-16 18:00:00'
}

exports.hikeEndDates_wrong ={
    'date_time' : '2022-11-16 10:00:00'
}