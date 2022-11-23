'use strict';

const hike = require('../Queries/hike');
const point = require('../Queries/point');
const db = require('../Queries/DAO');

class Hike {
    constructor(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province,
        city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type) {

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
}


function Point(id, latitude, longitude, altitude, name, address, hike_id) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
    this.name = name;
    this.address = address;
    this.hike_id = hike_id;
}

class HikeInput {
    constructor(title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, gpx) {
        this.title = title;
        this.length_kms = length_kms;
        this.expected_mins = expected_mins;
        this.ascendent_meters = ascendent_meters;
        this.difficulty = difficulty;
        this.description = description;
        this.region = region;
        this.province = province;
        this.city = city;
        this.gpx = gpx;
    }
}

describe("NewHikeDao", () => {
    beforeAll(async () => {
        await db.run('DELETE FROM HIKE');
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
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM SQLITE_SEQUENCE');
    });


    test('Test newHike', async () => {

        let lg_id = 1;
        let hikeIdToCheck;
        let hikeToCheck;

        const hike1 = new Hike(1, "prova1", 10, 120, 980, "Hiker", "", "Piemonte", "TO", "Bardonecchia", lg_id, "gpx_content", null, null, null, null);
        const hikeInput1 = new HikeInput(hike1.title, hike1.length_kms, hike1.expected_mins, hike1.ascendent_meters, hike1.difficulty, hike1.description, hike1.region, hike1.province, hike1.city, hike1.gpx);

        hikeIdToCheck = await hike.newHike(hikeInput1, lg_id);
        hikeToCheck = await hike.getHikeById(hikeIdToCheck);
        expect(hikeToCheck).toEqual(hike1);

        const hike2 = new Hike(2, "prova2", 20, 140, 1000, "Professional Hiker", "", "Piemonte", "TO", "La Touile", lg_id, "gpx_content", null, null, null, null);
        const hikeInput2 = new HikeInput(hike2.title, hike2.length_kms, hike2.expected_mins, hike2.ascendent_meters, hike2.difficulty, hike2.description, hike2.region, hike2.province, hike2.city, hike2.gpx);

        hikeIdToCheck = await hike.newHike(hikeInput2, lg_id);
        hikeToCheck = await hike.getHikeById(hikeIdToCheck);
        expect(hikeToCheck).toEqual(hike2);

    });

    test('Test updateHike', async () => {

        let lg_id = 1;
        let hikeIdToCheck;
        let hikeToCheck;
        let pointIdToCheck;
        let pointToCheck;

        const hike3 = new Hike(3, "prova3", 30, 130, 1300, "Professional Hiker", "", "Piemonte", "TO", "La Touile", lg_id, "gpx_content", null, null, null, null);
        const hikeInput3 = new HikeInput(hike3.title, hike3.length_kms, hike3.expected_mins, hike3.ascendent_meters, hike3.difficulty, hike3.description, hike3.region, hike3.province, hike3.city, hike3.gpx);

        hikeIdToCheck = await hike.newHike(hikeInput3, lg_id);
        console.log(hikeIdToCheck);

        const point1 = new Point(1, "54", "77", "724", "", "", hikeIdToCheck);
        pointIdToCheck = await point.storePoint(point1, hikeIdToCheck);
        pointToCheck = await point.getPointById(pointIdToCheck);
        expect(point1).toEqual(pointToCheck);

        const point2 = new Point(2, "80", "87", "1402", "", "", hikeIdToCheck);
        pointIdToCheck = await point.storePoint(point2, hikeIdToCheck);
        pointToCheck = await point.getPointById(pointIdToCheck);
        expect(point2).toEqual(pointToCheck);

        const updatedHike3 = new Hike(3, "prova3", 30, 130, 1300, "Professional Hiker", "", "Piemonte", "TO", "La Touile", lg_id, "gpx_content", point1.id, "point", point2.id, "point");
        hikeIdToCheck = await hike.updateHike(point1.id, "point", point2.id, "point", hikeIdToCheck);
        hikeToCheck = await hike.getHikeById(3);

        expect(updatedHike3).toEqual(hikeToCheck);

        let point3 = await point.getPointById(-100);
        expect(point3).toBe(undefined);

    });

});