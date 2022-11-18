"use strict"
const parkingDB = require('../Queries/parking');







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
            if (park === -1) {
                return res.status(404).json({ error: `Parking lot not found not found` }); // not found
            }
            return res.status(200).json(park);
        } catch (err) {
            return res.status(500).end();
        }
    };


}

module.exports.ParkingLotsDescription = ParkingLotsDescription;