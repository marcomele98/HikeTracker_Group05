const hike = require('../Queries/hike');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');




function HikesParkings(hike_id, parking_id) {
    this.hike_id = hike_id;
    this.parking_id = parking_id;
}



describe("HikeParkingDao", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
        await db.run("INSERT INTO PARKING_LOT(name, latitude, longitude, altitude, region, province, city)\
                    VALUES('Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio'),\
                    ('Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio')");
        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, description, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type)\
            VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', '', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'general point', 2, 'Parking point'),\
            (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', '', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'Parking point', 3, 'Parking point')"
        );
        await db.run("INSERT INTO HIKE_PARKING (hike_id, parking_id)\
        VALUES(1, 1),\
        (2, 2)");
    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });


    test('test getHikesParkings', async () => {
        let data = await hike.getHikesParkings();
        let hh1 = new HikesParkings(1, 1);
        let hh2 = new HikesParkings(2, 2);
        expect(data.length).toStrictEqual(2);
        let hh1_check = new HikesParkings(data[0].hike_id, data[0].parking_id);
        let hh2_check = new HikesParkings(data[1].hike_id, data[1].parking_id);
        expect(hh1_check).toEqual(hh1);
        expect(hh2_check).toEqual(hh2);
    });


    test('test getHikesParkingsByHikeID', async () => {
        let data1 = await hike.getHikesParkingsByHikeID(1);
        expect(data1.length).toStrictEqual(1);
        expect(data1[0].parking_id).toBe(1);

        let data2 = await hike.getHikesParkingsByHikeID(2);
        expect(data2.length).toStrictEqual(1);
        expect(data2[0].parking_id).toBe(2);
    });

})