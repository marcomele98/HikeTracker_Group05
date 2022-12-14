'use strict';

const possibleDiff = ['Tourist', 'Hiker', 'Professional Hiker'];
const possibleTypes = ['general point', 'Parking point', 'Hut point'];
const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.isNotValidBody = (data) => {
    return data === undefined || data === null || data.length === 0;
}

exports.isNotValidType = (type) => {
    return type === undefined || type === null || type === '' || !possibleTypes.includes(type);
}

exports.isNotValidField = (field) => {
    return field === undefined || field === '' || field === null;
}

exports.isNotValidEmail = (email) => {
    return regex.test(email) === false && email !== undefined && email !== '' && email !== null;
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

exports.isNotValidPhone = (number) => {
    return isNaN(number) && number !== undefined && number !== '' && number !== null;
}

exports.isNotValidPoint = (point) => {
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

exports.isNotValidPointUser = (point) => {
    let regexpLatitude = new RegExp('^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$');
    let regexpLongitude = new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$');

    return point.point_latitude === undefined || point.point_latitude === '' ||
        point.point_latitude === null || point.point_latitude < -90 || point.point_latitude > 90 ||
        !regexpLatitude.test(point.point_latitude) ||
        point.point_longitude === undefined || point.point_longitude === '' ||
        point.point_longitude === null || point.point_longitude < -180 || point.point_longitude > 180 ||
        !regexpLongitude.test(point.point_longitude);
}

exports.isNotValidDateTime = (date_time) => {
    let date = date_time.split(" ")[0];
    let time = date_time.split(" ")[1];
    
    let regexp_date = new RegExp('^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$');
    let regexp_time = new RegExp('(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]')

    return !regexp_date.test(date) || !regexp_time.test(time);
}