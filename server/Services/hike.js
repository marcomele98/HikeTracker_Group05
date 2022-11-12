"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');




class HikeDescription {

    constructor() { }


    isNotValidBody = (data) => {
        return data === undefined || data === null || data.length === 0;
    }

    isNotValidField = (field) => {
        return field === undefined || field === '' || field === null;
    }

    isNotValidRegion = (field) => {
        return field === undefined || field === '' || field === null || field.length!==2;
    }

    isNotValidNumber = (number) => {
        return number === undefined || number === '' || number === null || isNaN(number);
    }

    isNotValidPoint = (point) => {
        let regexpLatitude = new RegExp('^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$');
        let regexpLongitude = new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$');
        return point.latitude === undefined || point.latitude === '' || 
        point.latitude === null || !regexpLatitude.test(point.latitude) ||
        point.longitude === undefined || point.longitude === '' || 
        point.longitude === null || !regexpLongitude.test(point.longitude) ||
        point.altitude === undefined || point.altitude === '' || 
        point.altitude === null || isNaN(point.altitude);
    }

    async newHikeDescription(req, res) {
        let hike = req.body;
        let lg_id = req.user.id;
        let role = req.user.role;

        if(role !== "local guide"){
            return res.status(401).end();
        }


        if (this.isNotValidBody(hike) || 
            this.isNotValidField(hike.title) ||
            this.isNotValidNumber(hike.length_kms)||
            this.isNotValidNumber(hike.expected_mins)||
            this.isNotValidNumber(hike.ascendent_meters)||
            this.isNotValidField(hike.difficulty)||
            this.isNotValidRegion(hike.region)||
            this.isNotValidField(hike.city)||
            this.isNotValidField(hike.gpx) ||
            this.isNotValidPoint(hike.end_point) ||
            this.isNotValidPoint(hike.start_point)) {
            return res.status(422).end();
        }

        for (var i = 0; i < hike.reference_points.length; i++) {
            if(this.isNotValidPoint(hike.reference_points[i])) {
                return res.status(422).end();
            }
        }

        try {
            let hike_id = await db.newHike(hike, lg_id);
            let end_point_id = await pointDB.storePoint(hike.end_point, hike_id)
            let start_point_id = await pointDB.storePoint(hike.start_point, hike_id)
            await db.updateHike(end_point_id, start_point_id, "point", hike_id)
            for (var i = 0; i < hike.reference_points.length; i++) {
                await pointDB.storePoint(hike.reference_points[i], hike_id);
            }
            return res.status(201).end();
        }
        catch (err) {
            return res.status(503).end();
        }
    }
}

module.exports = HikeDescription;