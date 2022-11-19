"use strict"
const hutDB = require('../Queries/hut');







class HutDescription {

    constructor() { }

    isNotValidBody = (data) => {
        return data == undefined;
    }

    isNotValidField = (field) => {
        return field == undefined;
    }



    isNotValidProvince = (field) => {
        return field === undefined || field === '' || field === null || field.length !== 2;
    }

    isNotValidPoint = (point) => {
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


    async getAllHuts(req, res) {
        try {
            let huts = await hutDB.getHuts();
            return res.status(200).json(huts);

        }
        catch (err) {
            return res.status(500).end();
        }

    };

    async getHutById(req, res) {

        try {
            let hut = await hutDB.getHutById(req.params.hutId)
            if (hut === -1) {
                return res.status(404).json({ error: `Hut not found` }); // not found
            }
            return res.status(200).json(hut);
        } catch (err) {
            return res.status(500).end();
        }
    };

}

module.exports.HutDescription = HutDescription;