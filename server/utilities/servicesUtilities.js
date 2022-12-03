'use strict';

const possibleDiff = ['Tourist', 'Hiker', 'Professional Hiker'];
const possibleTypes = ['general point', 'Parking point', 'Hut point'];

exports.isNotValidBody = (data) => {
    return data === undefined || data === null || data.length === 0;
}

exports.isNotValidType = (type) => {
    return type === undefined || type === null || type === '' || !possibleTypes.includes(type);
}

exports.isNotValidField = (field) => {
    return field === undefined || field === '' || field === null;
}

exports.isNotValidDiff = (field) => {
    return field === undefined || field === '' || field === null || !possibleDiff.includes(field);
}

exports.isNotValidProvince = (field) => {
    return field === undefined || field === '' || field === null || field.length !== 2;
}

exports.isNotValidNumber = (number) => {
    return number === undefined || number === '' || number === null || isNaN(number);
}

exports.isNotValidPoint = (point) => {
    console.log(point)
    let regexpLatitude = new RegExp('^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$');
    let regexpLongitude = new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$');

    return point.latitude === undefined || point.latitude === '' ||
        point.latitude === null || point.latitude < -90 || point.latitude > 90 ||
        !regexpLatitude.test(point.latitude) ||
        point.longitude === undefined || point.longitude === '' ||
        point.longitude === null || point.longitude < -180 || point.longitude > 180 ||
        !regexpLongitude.test(point.longitude) ||
        point.altitude === undefined || point.altitude === '' ||
        point.altitude === null || isNaN(point.altitude);
}