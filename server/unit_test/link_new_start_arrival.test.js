'use strict';

const hike = require('../Queries/hike');
const parking = require('../Queries/parking');
const hut = require('../Queries/hut');
const point = require('../Queries/point');
const db = require('../Queries/DAO');

function HikesParkings(hike_id, parking_id) {
    this.hike_id = hike_id;
    this.parking_id = parking_id;
}

function HikesHuts(hike_id, hut_id) {
    this.hike_id = hike_id;
    this.hut_id = hut_id;
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
        await db.run("INSERT INTO HIKE(title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES ('ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 1, 'general point'),\
            ('Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 2, 'general point', 2, 'general point')"
        );
        await db.run("INSERT INTO PARKING_LOT(name, latitude, longitude, altitude, region, province, city)\
                    VALUES('Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio'),\
                    ('Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio')"
        );
        await db.run(
            "INSERT INTO HUT(name,latitude, longitude, altitude, type, region, province, city, number_of_beds, description)\
                 VALUES ('Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, 'prova1'),\
                        ('Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, 'prova2')"
        );
        await db.run(
            "INSERT INTO POINT(latitude, longitude, altitude, name, address, hike_id)\
                 VALUES ('45.20353', '7.07734', '3538','Rocciamelone', 'Rocciamelone, Piedmont', 1),\
                        ('44.20647', '7.92800', '5300','La pianura dalle Alpi Liguri', 'Garessio, Cuneo', 2),\
                        ('44.23647', '7.95442', '3000',	'Bric Mindino', 'Garessio, Cuneo, Piedmont', 2),\
                        ('44.24354', '7.97038',	'6900',	'Sentiero per il colle di prato rotondo', 'Garessio, Cuneo, Piedmont', 2)"
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

        let data;
        data = await hike.getHikesParkingsByHikeID(1);
        expect(data[0]).toBe(undefined);
        expect(data[1]).toBe(undefined);

        
        await hike.insertParkForHike(1,1);
        await hike.insertParkForHike(1,2);

        data = await hike.getHikesParkingsByHikeID(1);
        expect(data.length).toEqual(2);


        expect(data[0].parking_id).toEqual(1);

        expect(data[1].parking_id).toEqual(2);

        expect(data[2]).toBe(undefined);

    });

    test('Test insertHutForHike', async () => {

        
        let data;
        data = await hike.getHikesHutsByHikeID(1);
        expect(data[0]).toBe(undefined);
        expect(data[1]).toBe(undefined);

        data = await hike.getHikesHutsByHikeID(2);
        expect(data[0]).toBe(undefined);
        expect(data[1]).toBe(undefined);

        await hike.insertHutForHike(1,1);
        await hike.insertHutForHike(2,2);

        data = await hike.getHikesHutsByHikeID(1);
        expect(data.length).toEqual(1);
        expect(data[0].hut_id).toEqual(1);

        data = await hike.getHikesHutsByHikeID(2);
        expect(data.length).toEqual(1);
        expect(data[0].hut_id).toEqual(2);

    });

    test('Test deleteParkForHike', async () => {
        
        
        let data;

        data = await hike.getHikesParkingsByHikeID(1);
        expect(data.length).toEqual(2);
        expect(data[0]).not.toBe(undefined);
        expect(data[1]).not.toBe(undefined);

       
        await hike.deleteParkForHike(1,1); 
        data = await hike.getHikesParkingsByHikeID(1);
        expect(data.length).toEqual(1);
        expect(data[0]).not.toBe(1);
        expect(data[1]).toBe(undefined);
        expect(data[0].parking_id).toEqual(2);

        await hike.deleteParkForHike(1,2); 
        data = await hike.getHikesParkingsByHikeID(1);
        expect(data.length).toEqual(0);
        expect(data[0]).toBe(undefined);
        expect(data[1]).toBe(undefined);

        
    });

    test('Test deleteHutForHike', async () => {

        
        let data;

        data = await hike.getHikesHutsByHikeID(1);
        expect(data.length).toEqual(1);
        expect(data[0]).not.toBe(undefined);

        await hike.deleteHutForHike(1,1); 
        data = await hike.getHikesHutsByHikeID(1);
        expect(data.length).toEqual(0);
        expect(data[0]).toBe(undefined);

        data = await hike.getHikesHutsByHikeID(2);
        expect(data.length).toEqual(1);
        expect(data[0]).not.toBe(undefined);

        await hike.deleteHutForHike(2,2); 
        data = await hike.getHikesHutsByHikeID(2);
        expect(data.length).toEqual(0);
        expect(data[0]).toBe(undefined);

    });

    test('Test deletePointById', async () => {
      
        let data;
        
        
        data = await point.getPointsByHikeId(2);
        expect(data.length).toEqual(3);

        //delete point2 (hike2)
        data = await point.getPointById(2);
        expect(data).not.toBe(undefined);
        await point.deletePointById(2);
        data = await point.getPointById(2);
        expect(data).toBe(undefined);

        data = await point.getPointsByHikeId(2);
        expect(data.length).toEqual(2);
        
        //delete point4 (hike2)
        data = await point.getPointById(4);
        expect(data).not.toBe(undefined);
        await point.deletePointById(4);
        data = await point.getPointById(4);
        expect(data).toBe(undefined);

        data = await point.getPointsByHikeId(2);
        expect(data.length).toEqual(1);
        
        //test if last point of the hike2 is point3:
        const point_checker = await point.getPointById(3);
        data = await point.getPointsByHikeId(2);
        expect(data.length).toEqual(1);
        expect(data[0]).toEqual(point_checker);
    });

    test('Test updateHike', async () => {
        
        let hike_data;
        let data_check;
        

        const park_data = await parking.getParkingById(1); //it will be the start point
        const hut_data = await hut.getHutById(1); //it will be the end point

        //checks before changes
        hike_data = await hike.getHikeById(2);
        data_check = await point.getPointById(hike_data.start_point);
        expect(data_check).not.toEqual(park_data);
        data_check = await point.getPointById(hike_data.end_point);
        expect(data_check).not.toEqual(hut_data);


        //after changes
        await hike.updateHike(hut_data.id,'Hut point',park_data.id,'Parking point',2);
        hike_data = await hike.getHikeById(2);
        
        //checking types
        expect(hike_data.start_point_type).toEqual('Parking point');
        expect(hike_data.end_point_type).toEqual('Hut point');
        
        //checking point objects
        let new_start_point = await parking.getParkingById(hike_data.start_point);
        let new_end_point = await hut.getHutById(hike_data.end_point);
        expect(park_data).toEqual(new_start_point);
        expect(hut_data).toEqual(new_end_point);


        //try to change just the end point to make a ring
        await hike.updateHike(park_data.id,'Parking point',park_data.id,'Parking point',2);
        hike_data = await hike.getHikeById(2);

        //checking types
        expect(hike_data.start_point_type).toEqual('Parking point');
        expect(hike_data.end_point_type).toEqual('Parking point');
        
        //checking point objects
        new_start_point = await parking.getParkingById(hike_data.start_point);
        new_end_point = await parking.getParkingById(hike_data.start_point);
        expect(park_data).toEqual(new_start_point);
        expect(park_data).toEqual(new_end_point);
        expect(hut_data).not.toEqual(new_end_point);
        expect(hut_data).not.toEqual(new_start_point);

        
    });

});