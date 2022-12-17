const parking = require('../Queries/parking');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');


function Parking(id, name, latitude, longitude, altitude, region, province, city){
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
    this.region = region;
    this.province = province;
    this.city = city;
}


describe("ParkingsDao", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await db.run(
            "INSERT INTO PARKING_LOT(name, latitude, longitude, altitude, region, province, city)\
                VALUES('Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio'),\
                      ('Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio'),\
                      ('Parcheggio di Barmasc','45.809639','7.676498','1895.081', \"Valle d'Aosta\",'AO','Lignod')"
        );
    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });

    test('test getAllParkings', async () => {
        let data = await parking.getParkings();
        let parking1 = new Parking(1, 'Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio');
        let parking2 = new Parking(2, 'Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio');
        let parking3 = new Parking(3, 'Parcheggio di Barmasc','45.809639','7.676498','1895.081', "Valle d'Aosta",'AO','Lignod');
        expect(data.length).toStrictEqual(3);
        let parking_check1 = new Parking(data[0].id, data[0].name, data[0].latitude, data[0].longitude, data[0].altitude, data[0].region, data[0].province, data[0].city);
        let parking_check2 = new Parking(data[1].id, data[1].name, data[1].latitude, data[1].longitude, data[1].altitude, data[1].region, data[1].province, data[1].city);
        let parking_check3 = new Parking(data[2].id, data[2].name, data[2].latitude, data[2].longitude, data[2].altitude, data[2].region, data[2].province, data[2].city);
        expect(parking1).toEqual(parking_check1);
        expect(parking2).toEqual(parking_check2);
        expect(parking3).toEqual(parking_check3);
    });

    test('test getParkingById', async () => {
        let data;
        let parking1 = new Parking(1, 'Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio');
        let parking2 = new Parking(2, 'Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio');
        let parking3 = new Parking(3, 'Parcheggio di Barmasc','45.809639','7.676498','1895.081',"Valle d'Aosta",'AO','Lignod');

        data = await parking.getParkingById(1);
        let parking_check1 = new Parking(data.id, data.name, data.latitude, data.longitude, data.altitude, data.region, data.province, data.city);

        data = await parking.getParkingById(2);
        let parking_check2 = new Parking(data.id, data.name, data.latitude, data.longitude, data.altitude, data.region, data.province, data.city);

        data = await parking.getParkingById(3);
        let parking_check3 = new Parking(data.id, data.name, data.latitude, data.longitude, data.altitude, data.region, data.province, data.city);
        expect(parking1).toEqual(parking_check1);
        expect(parking2).toEqual(parking_check2);
        expect(parking3).toEqual(parking_check3);

        data = await parking.getParkingById(-1);
        expect(data).toBe(undefined);

        data = await parking.getParkingById(4);
        expect(data).toBe(undefined);
    });
})