"use strict"
const parkingDB = require('../Queries/parking');
const servicesUtility = require('../utilities/servicesUtilities')

class ParkingLotsDescription {

    constructor() { }

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

        if (servicesUtility.isNotValidBody(park)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(park.name)) {
            message = "Invalid Name"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(park.capacity)) {
            message = "Invalid capacity"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidProvince(park.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }
        if (servicesUtility.isNotValidField(park.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }
        if (servicesUtility.isNotValidField(park.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidPoint({...park})) {
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