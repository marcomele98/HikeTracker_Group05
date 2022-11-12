"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');
const hutDB = require('../Queries/hut');
const parkingDB = require('../Queries/parking');
const {HikeDetailStruct} = require("../Models/hike_model");
const e = require('express');
const { each } = require('lodash');


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

        if(role !== "local guide"){
            return res.status(401).end();
        }


        if (this.isNotValidBody(hike) || 
            this.isNotValidField(hike.title) ||
            this.isNotValidNumber(hike.length_kms)||
            this.isNotValidNumber(hike.expected_mins)||
            this.isNotValidNumber(hike.ascendent_meters)||
            this.isNotValidField(hike.difficulty)||
            this.isNotValidField(hike.region)||
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

class HikesView {

    constructor() { }

    async getAllHikes(req, res) {
        try {
            let hikes = await db.getHikes();
            return res.status(201).json(hikes);
        }
        catch (err) {
            return res.status(503).end();
        }
    };

    async getHikeById(req, res) {

        db.getHikeById(req.params.id)
        .then((hike) => {
            if (hike === -1) 
            {
                return res.status(404).json({ error: `Hike not found` }); // not found
            } 
            else 
            {
                //get endpoint details
                if(hike.end_point_type == 'general point')
                {
                    let endpointDetails;
                    endpointDetails = pointDB.getPointById(hike.end_point);
                    hike.end_point = endpointDetails;
                }
                else if(hike.end_point_type == 'Parking point')
                {
                    let endpointDetails;
                    endpointDetails = parkingDB.getParkingById(hike.end_point);
                    hike.end_point = endpointDetails;
                }
                else
                {
                    let endpointDetails;
                    endpointDetails = hutDB.getHutById(hike.end_point);
                    hike.end_point = endpointDetails;

                }
                //get startpoint details
                if(hike.start_point_type == 'general point')
                {
                    let startpointDetails;
                    startpointDetails = pointDB.getPointById(hike.start_point);
                    hike.start_point = startpointDetails;

                }
                else if(hike.start_point_type == 'Parking point')
                {
                    let startpointDetails;
                    startpointDetails = parkingDB.getParkingById(hike.start_point);
                    hike.start_point = startpointDetails;

                }
                else
                {
                    let startpointDetails;
                    startpointDetails = hutDB.getHutById(hike.start_point);
                    hike.start_point = startpointDetails;

                }
                HikeDetailStruct.hike = hike;

                let hutIds;
                hutIds = db.getHikesHutsByHikeID(req.params.id); //get list of huts Ids of the hike
                let index = 0; 
                for(let id of hutIds )
                {
                    HikeDetailStruct.hut[index] = hutDB.getHutById(id);
                    index++;

                }

                let parkingIds;
                parkingIds = db.getHikesParkingsByHikeID(req.params.id); //get list of parkings Ids of the hike
                index = 0; 
                for(let id of parkingIds )
                {
                    HikeDetailStruct.parking[index] = parkingDB.getParkingById(id);
                    index++;

                }

                HikeDetailStruct.generalPoint = pointDB.getPointsByHikeId(req.params.id);



                return res.status(200).json(HikeDetailStruct);
            }
        })
        .catch((err) => res.status(503).end());
    };


}

module.exports.HikeDescription = HikeDescription;
module.exports.HikesView = HikesView;