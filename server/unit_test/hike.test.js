'use strict';
const hike = require('../Queries/hike');
const db = require('../Queries/DAO'); 

describe("Hike test", () => {
    beforeAll(async () => {
        await db.run('DELETE FROM HIKE_PARKING');
            await db.run('DELETE FROM PARKING_LOT');
            await db.run('DELETE FROM HIKE');
            await db.run('DELETE FROM sqlite_sequence');
            await db.run(
                "INSERT INTO PARKING_LOT(id,name,latitude, longitude, altitude)\
                 VALUES (1, 'Piazzale di Valdinferno','44.19296', '7.95501','1192'),\
                        (2, 'Parking Garessio 200','44.21653', '7.94425','1392')"

            );
            await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Montepantero', 1,'gpx_content', 1, 'point', 2, 'parking_lot'),\
            (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'CN', 'Garessio', 1,'gpx_content', 1, 'parking_lot', 3, 'parking_lot')\
            ");
        await db.run("INSERT INTO HIKE_PARKING (hike_id, parking_id)\
        VALUES(1, 1),\
        (2, 2)\
        ");
    });

    afterAll(async () => {
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM sqlite_sequence');

    });


    function Hike(id, title, length_kms, expected_mins, ascendent_meters, difficulty, region, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type) {
        this.id = id;
        this.title = title;
        this.length_kms = length_kms;
        this.expected_mins = expected_mins;
        this.ascendent_meters = ascendent_meters;
        this.difficulty = difficulty;
        this.region = region;
        this.city = city;
        this.lg_id = lg_id;
        this.gpx = gpx;
        this.end_point = end_point;
        this.end_point_type = end_point_type;
        this.start_point = start_point;
        this.start_point_type = start_point_type;
    }

    test('test getAllHikes', async () => {
        let data = await hike.getHikes();
        let hike1 = new Hike(1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'point', 2, 'parking_lot');
        let hike2 = new Hike(2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'CN', 'Garessio', 1, 'gpx_content', 1, 'parking_lot', 3, 'parking_lot');

        expect(data.length).toStrictEqual(2);
        let hike_check1 = new Hike(data[0].id, data[0].title, data[0].length_kms, data[0].expected_mins, data[0].ascendent_meters, data[0].difficulty, data[0].region, data[0].city, data[0].lg_id, data[0].gpx, data[0].end_point, data[0].end_point_type, data[0].start_point, data[0].start_point_type);
        let hike_check2 = new Hike(data[1].id, data[1].title, data[1].length_kms, data[1].expected_mins, data[1].ascendent_meters, data[1].difficulty, data[1].region, data[1].city, data[1].lg_id, data[1].gpx, data[1].end_point, data[1].end_point_type, data[1].start_point, data[1].start_point_type);
        expect(hike_check1).toEqual(hike1);
        expect(hike_check2).toEqual(hike2);
    });


    test('test getHike', async () => {
        let data1 = await hike.getHikeById(1);
        let hike1 = new Hike(data1.id, data1.title, data1.length_kms, data1.expected_mins, data1.ascendent_meters, data1.difficulty, data1.region, data1.city, data1.lg_id, data1.gpx, data1.end_point, data1.end_point_type, data1.start_point, data1.start_point_type);
        let hike_check1 = new Hike(1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'point', 2, 'parking_lot');
        expect(hike_check1).toEqual(hike1);

        let data2 = await hike.getHikeById(2);
        let hike2 = new Hike(data2.id, data2.title, data2.length_kms, data2.expected_mins, data2.ascendent_meters, data2.difficulty, data2.region, data2.city, data2.lg_id, data2.gpx, data2.end_point, data2.end_point_type, data2.start_point, data2.start_point_type);
        let hike_check2 = new Hike(2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'CN', 'Garessio', 1, 'gpx_content', 1, 'parking_lot', 3, 'parking_lot');
        expect(hike_check2).toEqual(hike2);

        let data3 = await hike.getHikeById(-1);
        expect(data3).toBe(-1);

        let data4 = await hike.getHikeById(100);
        expect(data4).toBe(-1);
    });
});