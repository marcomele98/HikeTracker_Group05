"use strict"

const db = require('../Queries/hike');
const pointDB = require('../Queries/point');




class HikeDescription {

    constructor() { }

    async newHikeDescription(req, res) {
        let hike = req.body;
        let lg_id = req.user.id;
        // let end_point = hike.end_point
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