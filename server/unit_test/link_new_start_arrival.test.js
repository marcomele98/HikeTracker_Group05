'use strict';

const hike = require('../Queries/hike');
const point = require('../Queries/point');
const db = require('../Queries/DAO');

function Hike(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type) {
    this.id = id;
    this.title = title;
    this.length_kms = length_kms;
    this.expected_mins = expected_mins;
    this.ascendent_meters = ascendent_meters;
    this.difficulty = difficulty;
    this.description = description;
    this.region = region;
    this.province = province;
    this.city = city;
    this.lg_id = lg_id;
    this.gpx = gpx;
    this.end_point = end_point;
    this.end_point_type = end_point_type;
    this.start_point = start_point;
    this.start_point_type = start_point_type;
}

describe("Update start/arrival for an hike", () => {
    beforeAll(async () => {
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM SQLITE_SEQUENCE');
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Mario', 'Rossi', 'local guide', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'lg1@p.it', '4783473632662333', '3334567980')"
        );
    });

    afterAll(async () => {
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM SQLITE_SEQUENCE');
    });


    test('Test insertParkForHike', async () => {


    });

    test('Test insertHutForHike', async () => {

    });

    test('Test deleteParkForHike', async () => {


    });

    test('Test deleteHutForHike', async () => {

    });

    test('Test deletePointById', async () => {


    });

});