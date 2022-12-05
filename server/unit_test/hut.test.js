'use strict';

const hut = require('../Queries/hut');
const db = require('../Queries/DAO');

class Hut {
    constructor(id, name, latitude, longitude, altitude, type, region, province, city, number_of_beds, phone, email, description) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.type = type;
        this.region = region;
        this.province = province;
        this.city = city;
        this.number_of_beds = number_of_beds;
        this.phone = phone;
        this.email = email;
        this.description = description;
    }
}

describe("NewHutDAO", () => {
    beforeAll(async () => {
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM SQLITE_SEQUENCE');
    });

    afterAll(async () => {
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM SQLITE_SEQUENCE');
    });

    test('test new hut', async () => {

        let inserted_hut;
        let retrieved_hut;

        let hut1 = new Hut(1, 'Rifugio 1', '45.24324', '9.02324', '139', 'Refuge', 'Piemonte', 'AL', 'Casale Monferrato', 35,"1234567890", 'Rifugio_1@gmail.com', 'The best hut in the Monferrato Region');
        inserted_hut = await hut.addHut(hut1);
        retrieved_hut = await hut.getHutById(inserted_hut);
        expect(retrieved_hut).toEqual(hut1);

        let hut2 = new Hut(2, 'Rifugio 2', '67.24324', '4.02324', '2300', 'Refuge', 'Piemonte', 'CN', 'Cuneo', 50, "5555555555", 'Rifugio_2@gmail.com', 'A great refuge in the mountains of Cuneo');
        inserted_hut = await hut.addHut(hut2);
        retrieved_hut = await hut.getHutById(inserted_hut);
        expect(retrieved_hut).toEqual(hut2);

        let hut3 = new Hut(3, 'Rifugio 3', '46.3846', '23,234245', '1290', 'Restaurant', 'Toscana', 'SI', 'Siena', 35, "6666666666", 'Rifugio_3@gmail.com', 'Dive into the beatiful hills around Siena');
        inserted_hut = await hut.addHut(hut3);
        retrieved_hut = await hut.getHutById(inserted_hut);
        expect(retrieved_hut).toEqual(hut3);
    });
});