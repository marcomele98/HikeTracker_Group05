"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');
const hutDB = require('../Queries/hut');
const parkingDB = require('../Queries/parking');
const { HikeDetailStruct } = require("../Models/hike_model");
const e = require('express');
const { each } = require('lodash');
const { HikeStruct, Hike_HutStruct, Hike_ParkingStruct } = require('../Models/hike_model');

let HikeDetails = new HikeDetailStruct;

class HikeDescription {

    constructor() { }


    isNotValidBody = (data) => {
        return data === undefined || data === null || data.length === 0;
    }

    isNotValidField = (field) => {
        return field === undefined || field === '' || field === null;
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

        if (role !== "local guide") {
            return res.status(401).end();
        }


        if (this.isNotValidBody(hike) ||
            this.isNotValidField(hike.title) ||
            this.isNotValidNumber(hike.length_kms) ||
            this.isNotValidNumber(hike.expected_mins) ||
            this.isNotValidNumber(hike.ascendent_meters) ||
            this.isNotValidField(hike.difficulty) ||
            this.isNotValidField(hike.region) ||
            this.isNotValidField(hike.city) ||
            this.isNotValidField(hike.gpx) ||
            this.isNotValidPoint(hike.end_point) ||
            this.isNotValidPoint(hike.start_point)) {
            return res.status(422).end();
        }

        for (var i = 0; i < hike.reference_points.length; i++) {
            if (this.isNotValidPoint(hike.reference_points[i])) {
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
class HikesView {

    constructor() { }

    async getAllHikes(req, res) {
        try {
            let hikes = await db.getHikes();
            return res.status(200).json(hikes);

        }
        catch (err) {

            return res.status(503).end();
        }

    };

    async getHikeById(req, res) {

        let hike = await db.getHikeById(req.params.hikeId)
        if (hike === -1) {
            return res.status(404).json({ error: `Hike not found` }); // not found
        }
        else {
            //get endpoint details
            if (hike.end_point_type === 'general point') {
                let endpointDetails = await pointDB.getPointById(hike.end_point)

                hike.end_point = endpointDetails;
                HikeDetails.hike = hike;
                //console.log(hike.end_point);

            }
            else if (hike.end_point_type == 'Parking point') {
                let endpointDetails = await parkingDB.getParkingById(hike.end_point);
                hike.end_point = endpointDetails;
                HikeDetails.hike = hike;
                //console.log(hike.end_point);
                //console.log(HikeDetails.hike);
            }
            else {

                let endpointDetails = await hutDB.getHutById(hike.end_point);
                hike.end_point = endpointDetails;
                HikeDetails.hike = hike;
                //console.log(hike.end_point);


            }
            //get startpoint details
            if (hike.start_point_type == 'general point') {
                let startpointDetails = await pointDB.getPointById(hike.start_point);
                hike.start_point = startpointDetails;
                HikeDetails.hike = hike;

            }
            else if (hike.start_point_type == 'Parking point') {
                let startpointDetails = await parkingDB.getParkingById(hike.start_point)

                hike.start_point = startpointDetails;
                HikeDetails.hike = hike;
                //console.log(hike.start_point);

            }
            else {
                let startpointDetails = await hutDB.getHutById(hike.start_point);
                hike.start_point = startpointDetails;
                HikeDetails.hike = hike;
                //console.log(hike.start_point);

            }
            //HikeDetailStruct.hike = hike;
            //console.log(HikeDetails.hike);

            //let hutIds;
            let hutIds = await db.getHikesHutsByHikeID(req.params.hikeId) //get list of huts Ids of the hike
                //console.log(hutIds);
                    let index = 0;
                    for (let id of hutIds) {
                        //console.log(id);
                        let hut= await hutDB.getHutById(id.hut_id)

                        HikeDetails.huts[index] = hut;
                        index++;
                    }

            let parkingIds = await db.getHikesParkingsByHikeID(req.params.hikeId) //get list of parkings Ids of the hike
            //console.log(parkingIds);
                    index = 0;
                    for (let id of parkingIds) {
                        let park = await parkingDB.getParkingById(id.parking_id)
                        HikeDetails.parking_lots[index] = park;
                            
                        index++;

                    }

            let points = await pointDB.getPointsByHikeId(req.params.hikeId)
            console.log(points);
                    HikeDetails.points = points;



            return res.status(200).json(HikeDetails);
        }

    };


}

module.exports.HikeDescription = HikeDescription;
module.exports.HikesView = HikesView;