'use strict';

const db = require('./DAO');


exports.newHike = async (hike, lg_id) => {
        const sql = 'INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        let result = await db.insert(sql, [hike.title, hike.length_kms, hike.expected_mins, hike.ascendent_meters, hike.difficulty, hike.description, hike.region, hike.province.toUpperCase(), hike.city, lg_id, hike.gpx]);
        return result;
}

exports.updateHike = async (end_point, type_end, start_point, type_start, hike_id) => {
        const sql = 'UPDATE HIKE SET end_point = ?, end_point_type = ?, start_point = ?, start_point_type = ?  WHERE id = ?';
        return db.run(sql, [end_point, type_end, start_point, type_start, hike_id]);
}

exports.getHikes = () => {
        const sql = 'SELECT * FROM HIKE';
        return db.all(sql, []);
}

exports.getHikesHuts = () => {
        const sql = 'SELECT * from HIKE_HUT';
        return db.all(sql, []);
}

exports.getHikesParkings = () => {
        const sql = 'SELECT * from HIKE_PARKING';
        return db.all(sql, []);
}

exports.getHikeById = (id) => {
        const sql = "SELECT * FROM HIKE WHERE id=?";
        return db.get(sql, [id]);
};

exports.getHikesHutsByHikeID = async (id) => {
        const sql = 'SELECT hut_id from HIKE_HUT WHERE hike_id=?';
        return db.all(sql, [id]);
};

exports.getHikesParkingsByHikeID = async (id) => {
        const sql = 'SELECT parking_id from HIKE_PARKING WHERE hike_id=?';
        return await db.all(sql, [id]);
};

exports.deleteHutForHike = async (hike_id, hut_id) => {
        const sql = "DELETE FROM HIKE_HUT WHERE hike_id = ? AND hut_id = ?"
        return await db.run(sql, [hike_id, hut_id]);
}

exports.deleteParkForHike = async (hike_id, park_id) => {
        const sql = "DELETE FROM HIKE_PARKING WHERE hike_id = ? AND parking_id = ?"
        return await db.run(sql, [hike_id, park_id]);
}

exports.insertHutForHike = async (hike_id, hut_id) => {
        const sql = "INSERT INTO HIKE_HUT(hike_id , hut_id) VALUES(?, ?)"
        let result =  db.run(sql, [hike_id, hut_id]);
        return result
}

exports.insertParkForHike = async (hike_id, park_id) => {
        const sql = "INSERT INTO HIKE_PARKING(hike_id , parking_id) VALUES(?, ?)"
        let result = await db.insert(sql, [hike_id, park_id]);
        return result
}

