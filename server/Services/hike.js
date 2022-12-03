"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');
const hutDB = require('../Queries/hut');
const parkingDB = require('../Queries/parking');

const possibleDiff = ['Tourist', 'Hiker', 'Professional Hiker'];
const possibleTypes = ['general point', 'Parking point', 'Hut point'];
// var NodeGeocoder = require('node-geocoder');



class HikeDescription {

    constructor() { }

    isNotValidBody = (data) => {
        return data === undefined || data === null || data.length === 0;
    }

    isNotValidType = (type) => {
        return type === undefined || type === null || type === '' || !possibleTypes.includes(type);
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

    deleteStartEndPoint = async (hikeId, oldStartType, oldEndType, oldStartId, oldEndId) => {
        if (oldStartType === 'Parking point' && (oldEndType !== 'Parking point' || (oldEndType === 'Parking point' && oldEndId !== oldStartId))) {
            await db.deleteParkForHike(hikeId, oldStartId);
        }
        else if (oldStartType === 'Hut point' && (oldEndType !== 'Hut point' || (oldEndType === 'Hut point' && oldEndId !== oldStartId))) {
            await db.deleteHutForHike(hikeId, oldStartId);
        }
        else if (oldStartType === 'general point' && (oldEndType !== 'general point' || (oldEndType === 'general point' && oldEndId !== oldStartId))) {
            await pointDB.deletePointById(oldStartId);
        }
    }







    // getCity = async (lat, lon) => {

    //     console.log({lat, lon})
    //     var geocoder = NodeGeocoder({
    //         provider: 'google',
    //         apiKey: 'AIzaSyChltbm9OptIco4UdxhjF09fRGLixuFzcE',
    //         formatter: 'json' // 'gpx', 'string', ...
    //       });

    //     // Reverse Geocode
    //     geocoder.reverse({lat, lon})
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    // }


    async newHikeDescription(req, res) {
        let hike = req.body;
        let lg_id = req.user.id;
        let role = req.user.role;
        let message = ""


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

        // await this.getCity(hike.start_point.latitude, hike.start_point.longitude)

        try {
            let hike_id = await db.newHike(hike, lg_id);
            let end_point_id = await pointDB.storePoint(hike.end_point, hike_id)
            let start_point_id = end_point_id
            if ((hike.end_point.latitude !== hike.start_point.latitude) && (hike.end_point.longitude !== hike.start_point.longitude)) {
                start_point_id = await pointDB.storePoint(hike.start_point, hike_id)
            }
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


    async updateStartPoint(req, res) {
        let update = req.body;
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""


        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidNumber(update.start_point)) {
            message = "Invalid Start Point id."
            return res.status(422).json(message);
        }

        if (this.isNotValidType(update.type_start)) {
            message = "Invalid Start Point type."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else {
                let oldStartId = hike.start_point
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldEndType = hike.end_point_type

                await this.deleteStartEndPoint(hike.id, oldStartType, oldEndType, oldStartId, oldEndId);

                await db.updateHike(oldEndId, oldEndType, update.start_point, update.type_start, hikeId);

                if (update.type_start !== oldEndType || (update.type_start === oldEndType && update.start_point !== oldEndId)) {
                    if (update.type_start === 'Parking point') {
                        let old = await db.getHikesParkingsByIDs(hikeId, update.start_point)
                        if (old === undefined)
                            await db.insertParkForHike(hikeId, update.start_point)
                    }
                    else if (update.type_start === 'Hut point') {
                        let old = await db.getHikesHutsByIDs(hikeId, update.start_point)
                        if (old === undefined)
                            await db.insertHutForHike(hikeId, update.start_point)
                    }
                }
                return res.status(200).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }

    async updateEndPoint(req, res) {
        let update = req.body;
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""


        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidNumber(update.end_point)) {
            message = "Invalid End Point id."
            return res.status(422).json(message);
        }

        if (this.isNotValidType(update.type_end)) {
            message = "Invalid End Point type."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else {
                let oldStartId = hike.start_point
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldEndType = hike.end_point_type

                await this.deleteStartEndPoint(hike.id, oldEndType, oldStartType, oldEndId, oldStartId);

                await db.updateHike(update.end_point, update.type_end, oldStartId, oldStartType, hikeId);

                if (update.type_end !== oldStartType || (update.type_end === oldStartType && update.end_point !== oldStartId)) {
                    if (update.type_end === 'Parking point') {
                        let old = await db.getHikesParkingsByIDs(hikeId, update.end_point)
                        if (old === undefined)
                            await db.insertParkForHike(hikeId, update.end_point)
                    }
                    else if (update.type_end === 'Hut point') {
                        let old = await db.getHikesHutsByIDs(hikeId, update.end_point)
                        if (old === undefined)
                            await db.insertHutForHike(hikeId, update.end_point)
                    }
                }
                return res.status(200).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }


    async resetStartPoint(req, res) {
        let update = req.body;
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""



        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidPoint(update)) {
            let message = "Invalid start point."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else {

                let oldStartId = hike.start_point
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldEndType = hike.end_point_type

                await this.deleteStartEndPoint(hike.id, oldStartType, oldEndType, oldStartId, oldEndId);

                let start_point_id = 0;

                let oldEnd = await pointDB.getPointById(oldEndId)
                console.log(oldEnd)

                if (oldEndType === "general point" && oldEnd.latitude == update.latitude && oldEnd.latitude == update.latitude) {
                    start_point_id = oldEndId;
                } else {
                    start_point_id = await pointDB.storePoint(update, hikeId);
                }

                await db.updateHike(hike.end_point, hike.end_point_type, start_point_id, "general point", hikeId)
                return res.status(200).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }


    async resetEndPoint(req, res) {
        let update = req.body;
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (this.isNotValidPoint(update)) {
            let message = "Invalid end point."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else {

                let oldStartId = hike.start_point
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldEndType = hike.end_point_type

                await this.deleteStartEndPoint(hike.id, oldEndType, oldStartType, oldEndId, oldStartId);

                let end_point_id = 0;

                let oldStart = await pointDB.getPointById(oldStartId)
                console.log(oldStart)
                console.log(update)

                if (oldStartType === "general point" && oldStart.latitude == update.latitude && oldStart.latitude == update.latitude) {
                    end_point_id = oldStartId;
                } else {
                    end_point_id = await pointDB.storePoint(update, hikeId);
                }
                await db.updateHike(end_point_id, "general point", hike.start_point, hike.start_point_type, hikeId)
                return res.status(200).end();
            }
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
            console.log(err);
            return res.status(500).json(err).end();
        }

    };

    async getHikeById(req, res) {

        try {
            let hike = await db.getHikeById(req.params.hikeId)
            if (hike === undefined) {
                return res.status(404).json({ error: `Hike not found` }); // not found
            }
            else {
                //get endpoint details
                if (hike.end_point_type === 'general point') {
                    let endpointDetails = await pointDB.getPointById(hike.end_point)
                    hike.end_point = endpointDetails;
                }
                else if (hike.end_point_type == 'Parking point') {
                    let endpointDetails = await parkingDB.getParkingById(hike.end_point);
                    hike.end_point = endpointDetails;
                }
                else {
                    let endpointDetails = await hutDB.getHutById(hike.end_point);
                    hike.end_point = endpointDetails;
                }

                //get startpoint details
                if (hike.start_point_type == 'general point') {
                    let startpointDetails = await pointDB.getPointById(hike.start_point);
                    hike.start_point = startpointDetails;

                }
                else if (hike.start_point_type == 'Parking point') {
                    let startpointDetails = await parkingDB.getParkingById(hike.start_point)
                    hike.start_point = startpointDetails;
                }
                else {
                    let startpointDetails = await hutDB.getHutById(hike.start_point);
                    hike.start_point = startpointDetails;
                }


                let hutIds = await db.getHikesHutsByHikeID(req.params.hikeId) //get list of huts Ids of the hike
                hike.huts = []
                let index = 0;
                for (let id of hutIds) {
                    let hut = await hutDB.getHutById(id.hut_id)

                    hike.huts[index] = hut;
                    index++;
                }

                let parkingIds = await db.getHikesParkingsByHikeID(req.params.hikeId) //get list of parkings Ids of the hike
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
        }
        catch (err) {
            return res.status(500).end();
        }
    };


}

module.exports.HikeDescription = HikeDescription;
module.exports.HikesView = HikesView;