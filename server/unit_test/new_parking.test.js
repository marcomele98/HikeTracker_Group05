'use strict';

const hike = require('../Queries/hike');
const parking = require('../Queries/parking');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');

class Parking {
    constructor(id, name, latitude, longitude, altitude,capacity, region, province, city) {

        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.capacity = capacity;
        this.region = region;
        this.province = province;
        this.city = city;
    }
}


class ParkingInput {
    constructor(name, latitude, longitude, altitude,capacity,region, province, city) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.capacity = capacity;
        this.region = region;
        this.province = province;
        this.city = city;
    }
}

describe("NewParkingDao", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });


    test('Test newParking', async () => {

        let lg_id = 1;
        let parkingIdToCheck;
        let parkingToCheck;

        const parking1 = new Parking(1, "Polizia", "45.072685", "7.666741", "123", 34, "Piemonte", "TO", "Torino");
        const parkingInput1 = new ParkingInput(parking1.name, parking1.latitude, parking1.longitude, parking1.altitude, parking1.capacity, parking1.region, parking1.province, parking1.city);

        parkingIdToCheck = await parking.addParking(parkingInput1, lg_id);
        parkingToCheck = await parking.getParkingById(parkingIdToCheck);
        expect(parkingToCheck).toEqual(parking1);

        const parking2 = new Parking(2, "Dash Kitchen", "45.058473", "7.678607", "343", 12,"Piemonte", "TO", "Torino");
        const parkingInput2 = new ParkingInput(parking2.name, parking2.latitude, parking2.longitude, parking2.altitude, parking2.capacity, parking2.region, parking2.province, parking2.city);

        parkingIdToCheck = await parking.addParking(parkingInput2, lg_id);
        parkingToCheck = await parking.getParkingById(parkingIdToCheck);
        expect(parkingToCheck).toEqual(parking2);

    });

   

});