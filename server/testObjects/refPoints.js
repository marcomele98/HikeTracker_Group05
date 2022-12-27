
exports.point1 = {

    "latitude": "45.189032",
    "longitude": "7.076255",
    "altitude": "2693.187012",
    "name": "prova1",
    "address": "prova1"
}

exports.point2 = {

    "latitude": "45.184339",
    "longitude": "7.078848",
    "altitude": "2386.516113",
    "name": undefined,
    "address": undefined
}

exports.wrongPoint1 = {

    ...this.point1,
    "latitude": "ciao", 
    
}

exports.refPointRecord = {
    "point_id": 1,
    "time": '2022-11-16 14:00:00'
}

exports.refPointRecord_wrong = {
    "point_id": 1,
    "time": 'wrong'
}

exports.refPointRecord_wrong2 = {
    "point_id": 100,
    "time": '2022-11-16 14:00:00'
}