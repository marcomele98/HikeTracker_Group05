"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');
const hutDB = require('../Queries/hut');
const parkingDB = require('../Queries/parking');
const servicesUtility = require('../utilities/servicesUtilities');

const hikeControls = (hike, res) => {
    let message = "";

    if (servicesUtility.isNotValidBody(hike)) {
        message = "Invalid Body"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidField(hike.title)) {
        message = "Invalid Title"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidNumber(hike.length_kms)) {
        message = "Invalid Length"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidNumber(hike.expected_mins)) {
        message = "Invalid Expected Time"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidNumber(hike.ascendent_meters)) {
        message = "Invalid Ascent"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidDiff(hike.difficulty)) {
        message = "Invalid Difficulty"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidField(hike.description)) {
        message = "Invalid Description"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidField(hike.region)) {
        message = "Invalid Region"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidProvince(hike.province)) {
        message = "Invalid Province"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidField(hike.city)) {
        message = "Invalid City"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidField(hike.gpx)) {
        message = "Invalid gpx"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidPoint(hike.start_point)) {
        message = "Invalid start point"
        return res.status(422).json(message);
    }

    if (servicesUtility.isNotValidPoint(hike.end_point)) {
        message = "Invalid end point"
        return res.status(422).json(message);
    }
};

async function minmize_UpdateStartPoint(update, hikeId) {
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

async function minmize_UpdateEndPoint(update, hikeId) {
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

class HikeDescription {

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


    async newHikeDescription(req, res) {
        let hike = req.body;
        let lg_id = req.user.id;
        let role = req.user.role;
        let message = "";

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        hikeControls(hike, res);

        for (let point of hike.reference_points) {
            if (servicesUtility.isNotValidPoint(point)) {
                let message = "Invalid reference points"
                return res.status(422).json(message);
            }
        }

        try {
            let hike_id = await db.newHike(hike, lg_id);
            let end_point_id = await pointDB.storePoint(hike.end_point, hike_id)
            let start_point_id = end_point_id
            if ((hike.end_point.latitude !== hike.start_point.latitude) && (hike.end_point.longitude !== hike.start_point.longitude)) {
                start_point_id = await pointDB.storePoint(hike.start_point, hike_id)
            }
            await db.updateHike(end_point_id, "general point", start_point_id, "general point", hike_id)
            for (let point of hike.reference_points) {
                await pointDB.storePoint(point, hike_id);
            };
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

        if (servicesUtility.isNotValidNumber(update.start_point)) {
            message = "Invalid Start Point id."
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidType(update.type_start)) {
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

                    await minmize_UpdateStartPoint(update, hikeId);
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

        if (servicesUtility.isNotValidNumber(update.end_point)) {
            message = "Invalid End Point id."
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidType(update.type_end)) {
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
                let oldEndType = hike.end_point_type
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldStartId = hike.start_point

                await this.deleteStartEndPoint(hike.id, oldEndType, oldStartType, oldEndId, oldStartId);

                await db.updateHike(update.end_point, update.type_end, oldStartId, oldStartType, hikeId);

                if (update.type_end !== oldStartType || (update.type_end === oldStartType && update.end_point !== oldStartId)) {
                    await minmize_UpdateEndPoint(update, hikeId);
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

        if (servicesUtility.isNotValidPoint(update)) {
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

        if (servicesUtility.isNotValidPoint(update)) {
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

                let oldEndType = hike.end_point_type
                let oldStartType = hike.start_point_type
                let oldEndId = hike.end_point
                let oldStartId = hike.start_point

                await this.deleteStartEndPoint(hike.id, oldEndType, oldStartType, oldEndId, oldStartId);

                let end_point_id = 0;

                let oldStart = await pointDB.getPointById(oldStartId)

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


    async hikeHutLink(req, res) {

        let update = req.body; //hutid
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (servicesUtility.isNotValidNumber(update.hut_id)) {
            message = "Invalid hut Point id."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else {
                let old = await db.getHikesHutsByIDs(hikeId, update.hut_id)
                if (old === undefined)
                    await db.insertHutForHike(hikeId, update.hut_id)
                return res.status(201).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }

    }


    async addNewRefPoint(req, res) {
        let point = req.body;
        let hikeId = req.params.hikeId
        let role = req.user.role;
        let message = ""

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated as a local guide.");
        }

        if (servicesUtility.isNotValidPoint(point)) {
            message = "Invalid point."
            return res.status(422).json(message);
        }

        try {
            let hike = await db.getHikeById(hikeId);

            if (hike === undefined) {
                message = "Hike not found."
                return res.status(404).json(message);
            }
            else if (hike.lg_id !== req.user.id) {
                message = "Unauthorized";
                return res.status(401).json(message);
            }
            else {
                await pointDB.storePoint(point, hikeId);
                return res.status(201).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }

    async startHikeByHiker(req, res) {
        let hikeId = req.params.hikeId;
        let hikerId = req.user.id;
        let role = req.user.role;
        let date_time = req.body.date_time;
        let message = "";


        if (role !== "hiker") {
            return res.status(401).json("Not authenticated as a hiker.");
        }

        if (servicesUtility.isNotValidDateTime(date_time)) {
            message = "Invalid date-time format."
            return res.status(422).json(message);
        }

        try {
            let check_if_can_start = await db.getHikeByHiker(hikeId, hikerId);
            for (let hike of check_if_can_start) {
                if (hike.end_time == undefined && hike !== undefined) {
                    message = "This hike is already on-going for you";
                    return res.status(422).json(message);
                }
            }
            await db.startHikeByHiker(hikeId, hikerId, date_time);
            return res.status(201).end();
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }

    async endHikeByHiker(req, res) {
        let hikeId = req.params.hikeId;
        let hikerId = req.user.id;
        let role = req.user.role;
        let date_time = req.body.date_time;
        let message = "";


        if (role !== "hiker") {
            return res.status(401).json("Not authenticated as a hiker.");
        }

        if (servicesUtility.isNotValidDateTime(date_time)) {
            message = "Invalid date-time format."
            return res.status(422).json(message);
        }

        try {
            let hikes = await db.getHikeByHiker(hikeId, hikerId);

            if (hikes) {
                let started_hike = hikes.filter(h => h.end_time == null)[0];

                if (started_hike.end_time != null) {
                    message = "The hike has already been ended";
                    return res.status(422).json(message);
                }

                let start_date_time = new Date(started_hike.start_time);
                let end_date_time = new Date(date_time);

                if (end_date_time < start_date_time) {
                    message = "The end time should be after the start time"
                    return res.status(422).json(message);
                }


                await db.endHikeByHiker(hikeId, hikerId, started_hike.start_time, date_time);
                return res.status(200).end();
            }
        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }
    }

    async NewRefPointHiker(req, res) {
        let point_id = req.body.point_id;
        let time = req.body.time;
        let role = req.user.role;

        if (!role) {
            return res.status(401).json("Not authenticated.");
        }

        if (role !== "hiker") {
            return res.status(401).json("Unauthorized");
        }

        if (servicesUtility.isNotValidDateTime(time)) {
            return res.status(422).json("Invalid Time.");
        }

        try {
            let point = await pointDB.getPointById(point_id);

            if (point === undefined) {
                return res.status(422).json("Point not found.");
            }

            await pointDB.newRefPointHiker(point_id, req.user.id, time);
            return res.status(201).end();

        }
        catch (err) {
            return res.status(503).json("Server error")
        }
    }

    async getAllHikes(req, res) {
        try {
            let hikes = await db.getHikes();
            for (let hike of hikes) {
                if (hike.start_point_type == 'general point') {
                    let startpointDetails = await pointDB.getPointById(hike.start_point);
                    hike.start_point_lat = ""
                    hike.start_point_lon = ""
                    hike.start_point_lat = startpointDetails.latitude;
                    hike.start_point_lon = startpointDetails.longitude;
                }
                else if (hike.start_point_type == 'Parking point') {
                    let startpointDetails = await parkingDB.getParkingById(hike.start_point)
                    hike.start_point_lat = ""
                    hike.start_point_lon = ""
                    hike.start_point_lat = startpointDetails.latitude;
                    hike.start_point_lon = startpointDetails.longitude;
                }
                else {
                    let startpointDetails = await hutDB.getHutById(hike.start_point);
                    hike.start_point_lat = ""
                    hike.start_point_lon = ""
                    hike.start_point_lat = startpointDetails.latitude;
                    hike.start_point_lon = startpointDetails.longitude;
                }
                if (req.user != undefined && req.user.role == 'hiker') {
                    let hike_hiker = await db.getHikeByHiker(hike.id, req.user.id);
                    if (hike_hiker != undefined) {
                        hike.records = hike_hiker.map(h => { return ({ start_time: h.start_time, end_time: h.end_time }) })
                    }
                }
                hike.image = undefined;
                hike.gpx = undefined;
            };
            return res.status(200).json(hikes);

        }
        catch (err) {
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

                if (req.user != undefined && req.user.role == 'hiker') {
                    await getHikesofHiker(hike, req.user, req.user.role, req.user.id)
                }
                return res.status(200).json(hike);
            }
        }
        catch (err) {
            return res.status(500).end();
        }
    };


}

async function getHikesofHiker(hike, reqUser, reqUserRole, reqUserId) {
    if (reqUser != undefined && reqUserRole == 'hiker') {
        let hike_hiker = await db.getHikeByHiker(hike.id, reqUserId);
        if (hike_hiker.length != 0) {
            hike.records = hike_hiker.map(h => { return ({ start_time: h.start_time, end_time: h.end_time }) })
            for (let point of hike.points) {
                let point_details = await pointDB.getRefPointHiker(point.id, reqUserId, hike.records[hike.records.length-1].start_time)
                point.time = new Date(point_details?.time) > new Date(hike.records.find(r => r.end_time == undefined)?.start_time)
                    ?
                    point_details?.time
                    :
                    undefined
            }
        }
    }
}

module.exports.HikeDescription = HikeDescription;