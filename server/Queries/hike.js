'use strict';

const db = require('./DAO');


exports.newHike = async (hike, lg_id) => {
        const sql = 'INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        let result = await db.insert(sql, [hike.title, hike.length_kms, hike.expected_mins, hike.ascendent_meters, hike.difficulty, hike.description, hike.region, hike.province.toUpperCase(), hike.city, lg_id, hike.gpx, hike.image]);
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

exports.getHikesHutsByIDs = async (hike_id, hut_id) => {
        const sql = 'SELECT * from HIKE_HUT WHERE hike_id=? AND hut_id=?';
        return db.get(sql, [hike_id, hut_id]);
};

exports.getHikesParkingsByIDs = async (hike_id, parking_id) => {
        const sql = 'SELECT * from HIKE_PARKING WHERE hike_id=? AND parking_id=?';
        return await db.get(sql, [hike_id, parking_id]);
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

exports.getHikeByHiker = async (hike_id, hiker_id) => {
        const sql = "SELECT * FROM HIKE_HIKER WHERE hike_id = ? AND hiker_id = ?"
        let result = db.all(sql, [hike_id, hiker_id]);
        return result;
}

exports.startHikeByHiker = async (hike_id, hiker_id, start_time) => {
        const sql = "INSERT INTO HIKE_HIKER(hike_id, hiker_id, start_time)\
                        VALUES(?, ?, ?)"
        let result = db.insert(sql, [hike_id, hiker_id, start_time]);
        return result;
}

exports.endHikeByHiker = async(hike_id, hiker_id, start_time, end_time) => {
        const sql = "UPDATE HIKE_HIKER SET end_time = ? WHERE hike_id = ? AND hiker_id = ? AND start_time = ?"
        let result = db.run(sql, [end_time, hike_id, hiker_id, start_time]);
        return result;
}

