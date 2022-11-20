"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');
const hutDB = require('../Queries/hut');
const parkingDB = require('../Queries/parking');



const possibleDiff = ['Tourist', 'Hiker', 'Professional Hiker'];

class HikeDescription {


    constructor() {

    }

    isNotValidBody = (data) => {
        return data === undefined || data === null || data.length === 0;
    }

    isNotValidField = (field) => {
        return field === undefined || field === '' || field === null;
    }

    isNotValidDiff = (field) => {
        return field === undefined || field === '' || field === null || !possibleDiff.includes(field);
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

    async newHikeDescription(req, res) {
        let hike = req.body;
        let lg_id = req.user.id;
        let role = req.user.role;
        let message = ""

        console.log(hike)

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidBody(hike)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hike.title)) {
            message = "Invalid Title"
            return res.status(422).json(message);
        }

        if (this.isNotValidNumber(hike.length_kms)) {
            message = "Invalid Length"
            return res.status(422).json(message);
        }

        if (this.isNotValidNumber(hike.expected_mins)) {
            message = "Invalid Expected Time"
            return res.status(422).json(message);
        }

        if (this.isNotValidNumber(hike.expected_mins)) {
            message = "Invalid Expected Time"
            return res.status(422).json(message);
        }

        if (this.isNotValidNumber(hike.ascendent_meters)) {
            message = "Invalid Ascent"
            return res.status(422).json(message);
        }

        if (this.isNotValidDiff(hike.difficulty)) {
            message = "Invalid Difficulty"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hike.description)) {
            message = "Invalid Description"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hike.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (this.isNotValidProvince(hike.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hike.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }

        if (this.isNotValidField(hike.gpx)) {
            message = "Invalid gpx"
            return res.status(422).json(message);
        }

        if (this.isNotValidPoint(hike.start_point)) {
            message = "Invalid start point"
            return res.status(422).json(message);
        }

        if (this.isNotValidPoint(hike.end_point)) {
            message = "Invalid end point"
            return res.status(422).json(message);
        }

        for (var i = 0; i < hike.reference_points.length; i++) {
            if (this.isNotValidPoint(hike.reference_points[i])) {
                let message = "Invalid reference points"
                return res.status(422).json(message);
            }
        }

        try {
            let hike_id = await db.newHike(hike, lg_id);
            let end_point_id = await pointDB.storePoint(hike.end_point, hike_id)
            let start_point_id = await pointDB.storePoint(hike.start_point, hike_id)
            await db.updateHike(end_point_id, "general point", start_point_id, "general point", hike_id)
            for (var i = 0; i < hike.reference_points.length; i++) {
                await pointDB.storePoint(hike.reference_points[i], hike_id);
            }
            return res.status(201).end();
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }
}






class HikesView {

    constructor() { }

    async getAllHikes(req, res) {
        try {
            let hikes = await db.getHikes();
            for (var i = 0; i < hikes.length; i++) {
                if (hikes[i].start_point_type == 'general point') {
                    let startpointDetails = await pointDB.getPointById(hikes[i].start_point);
                    hikes[i].start_point_lat = ""
                    hikes[i].start_point_lon = ""
                    hikes[i].start_point_lat = startpointDetails.latitude;
                    hikes[i].start_point_lon = startpointDetails.longitude;
                }
                else if (hikes[i].start_point_type == 'Parking point') {
                    let startpointDetails = await parkingDB.getParkingById(hikes[i].start_point)
                    hikes[i].start_point_lat = ""
                    hikes[i].start_point_lon = ""
                    hikes[i].start_point_lat = startpointDetails.latitude;
                    hikes[i].start_point_lon = startpointDetails.longitude;
                }
                else {
                    let startpointDetails = await hutDB.getHutById(hikes[i].start_point);
                    hikes[i].start_point_lat = ""
                    hikes[i].start_point_lon = ""
                    hikes[i].start_point_lat = startpointDetails.latitude;
                    hikes[i].start_point_lon = startpointDetails.longitude;
                }
            }
            return res.status(200).json(hikes);

        }
        catch (err) {
            return res.status(500).end();
        }

    };

    async getHikeById(req, res) {

        try {
            let hike = await db.getHikeById(req.params.hikeId)
            if (hike === -1) {
                return res.status(404).json({ error: `Hike not found` }); // not found
            }
            else {
                //get endpoint details
                if (hike.end_point_type === 'general point') {
                    let endpointDetails = await pointDB.getPointById(hike.end_point)

                    hike.end_point = endpointDetails;
                    //console.log(hike.end_point);

                }
                else if (hike.end_point_type == 'Parking point') {
                    let endpointDetails = await parkingDB.getParkingById(hike.end_point);
                    hike.end_point = endpointDetails;
                    //console.log(hike.end_point);
                    //console.log(HikeDetails.hike);
                }
                else {

                    let endpointDetails = await hutDB.getHutById(hike.end_point);
                    hike.end_point = endpointDetails;
                    //console.log(hike.end_point);


                }
                //get startpoint details
                if (hike.start_point_type == 'general point') {
                    let startpointDetails = await pointDB.getPointById(hike.start_point);
                    hike.start_point = startpointDetails;

                }
                else if (hike.start_point_type == 'Parking point') {
                    let startpointDetails = await parkingDB.getParkingById(hike.start_point)

                    hike.start_point = startpointDetails;
                    //console.log(hike.start_point);

                }
                else {
                    let startpointDetails = await hutDB.getHutById(hike.start_point);
                    hike.start_point = startpointDetails;
                    //console.log(hike.start_point);

                }
                //HikeDetailStruct.hike = hike;
                //console.log(HikeDetails.hike);

                //let hutIds;
                let hutIds = await db.getHikesHutsByHikeID(req.params.hikeId) //get list of huts Ids of the hike
                hike.huts = []
                //console.log(hutIds);
                let index = 0;
                for (let id of hutIds) {
                    //console.log(id);
                    let hut = await hutDB.getHutById(id.hut_id)

                    hike.huts[index] = hut;
                    index++;
                }

                let parkingIds = await db.getHikesParkingsByHikeID(req.params.hikeId) //get list of parkings Ids of the hike
                //console.log(parkingIds);
                index = 0;
                hike.parking_lots = [];
                for (let id of parkingIds) {
                    let park = await parkingDB.getParkingById(id.parking_id)
                    hike.parking_lots[index] = park;

                    index++;

                }

                let points = await pointDB.getPointsByHikeId(req.params.hikeId)
                hike.points = [];
                hike.points = points;


                return res.status(200).json(hike);
            }
        } catch (err) {
            return res.status(500).end();
        }
    };


}

module.exports.HikeDescription = HikeDescription;
module.exports.HikesView = HikesView;