"use strict"
const parkingDB = require('../Queries/parking');







class ParkingLotsDescription {

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


    async getAllParking_lots(req, res) {
        try {
            let parking_lots = await parkingDB.getParkings();
            return res.status(200).json(parking_lots);

        }
        catch (err) {
            return res.status(500).end();
        }

    };

    async getParkingLotById(req, res) {

        try {
            let park = await parkingDB.getParkingById(req.params.parkingLotId)
            if (park === undefined) {
                return res.status(404).json({ error: `Parking lot not found` }); // not found
            }
            return res.status(200).json(park);
        } catch (err) {
            return res.status(500).end();
        }
    };

    
    async newParkingLot(req, res) {
        let park = req.body;
        let role = req.user.role;
        let message = ""


        if (role !== "local guide") {
            return res.status(401).json("Not authorized.");
        }

        if (this.isNotValidBody(park)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(park.name)) {
            message = "Invalid Name"
            return res.status(422).json(message);
        }

        if (this.isNotValidProvince(park.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }
        if (this.isNotValidField(park.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }
        if (this.isNotValidField(park.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (this.isNotValidPoint({...park})) {
            message = "Invalid point"
            return res.status(422).json(message);
        }


        try {
            await parkingDB.addParking(park);
            return res.status(201).end();
        }
        catch (err) {
            message = "Server Error"
            return res.status(503).json(message);
        }
    }

}

module.exports.ParkingLotsDescription = ParkingLotsDescription;