"use strict"
const hutDB = require('../Queries/hut');


class HutDescription {

    constructor() { }

    isNotValidBody = (data) => {
        return data === undefined || data === null || data.length === 0;
    }

    isNotValidField = (field) => {
        return field === undefined || field === '' || field === null;
    }

    isNotValidProvince = (field) => {
        return field === undefined || field === '' || field === null || field.length !== 2;
    }

    isNotValidNumber = (number) => {
        return number === undefined || number === '' || number === null || isNaN(number);
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

    async addHutDescription(req, res)
    {
        let hut = req.body;
        let role = req.user.role;
        let message = "";

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidBody(hut)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hut.name)) {
            message = "Invalid Name"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hut.type)) {
            message = "Invalid Type"
            return res.status(422).json(message);
        }

        if (this.isNotValidPoint({...hut})) {
            message = "Invalid point"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hut.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (this.isNotValidProvince(hut.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hut.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }

        if (this.isNotValidNumber(hut.number_of_beds)) {
            message = "Invalid number_of_beds"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hut.description)) {
            message = "Invalid Description"
            return res.status(422).json(message);
        }

        try {
            await hutDB.addHut(hut);
            return res.status(201).end();
        }
        catch (err) {
            message = "Server Error"
            return res.status(503).json(message);
        }
    }


    async getAllHuts(req, res) {
        try {
            let huts = await hutDB.getHuts();
            return res.status(201).json(huts);

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