const hut = require('../Queries/hut');
const db = require('../Queries/DAO');
const daoUtility = require('../utilities/daoUtilities');


function Hut(id, name, latitude, longitude, altitude, type, region, province, city, number_of_beds, description){
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
    this.description = description;
}




describe("hutsDao", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await db.run(
            "INSERT INTO HUT(id,name,latitude, longitude, altitude, type, region, province, city, number_of_beds, description)\
                 VALUES (1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, 'prova1'),\
                        (2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, 'prova2'),\
                        (3, 'Rifugio Duca degli Abruzzi','45.958891','7.6441','2798.2','Refuge',"Valle d'Aosta",'AO','Breuil-Cervinia',22,'prova3')"
        );
    });

    afterAll(async () => {
        await daoUtility.resetDB();

    });

    test('test getAllHuts', async () => {
        let data = await hut.getHuts();
        let hut1 = new Hut(1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, 'prova1');
        let hut2 = new Hut(2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, 'prova2');
        let hut3 = new Hut(3, 'Rifugio Duca degli Abruzzi','45.958891','7.6441','2798.2','Refuge',"Valle d'Aosta",'AO','Breuil-Cervinia',22,'prova3');
        expect(data.length).toStrictEqual(3);
        let hut_check1 = new Hut(data[0].id, data[0].name, data[0].latitude, data[0].longitude, data[0].altitude, data[0].type, data[0].region, data[0].province, data[0].city, data[0].number_of_beds, data[0].description);
        let hut_check2 = new Hut(data[1].id, data[1].name, data[1].latitude, data[1].longitude, data[1].altitude, data[1].type, data[1].region, data[1].province, data[1].city, data[1].number_of_beds, data[1].description);
        let hut_check3 = new Hut(data[2].id, data[2].name, data[2].latitude, data[2].longitude, data[2].altitude, data[2].type, data[2].region, data[2].province, data[2].city, data[2].number_of_beds, data[2].description);
        expect(hut1).toEqual(hut_check1);
        expect(hut2).toEqual(hut_check2);
        expect(hut3).toEqual(hut_check3);
    });

    test('test getHutById', async () => {
        let data;
        let hut1 = new Hut(1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, 'prova1');
        let hut2 = new Hut(2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, 'prova2');
        let hut3 = new Hut(3, 'Rifugio Duca degli Abruzzi','45.958891','7.6441','2798.2','Refuge',"Valle d'Aosta",'AO','Breuil-Cervinia',22,'prova3');

        data = await hut.getHutById(1);
        let hut_check1 = new Hut(data.id, data.name, data.latitude, data.longitude, data.altitude, data.type, data.region, data.province, data.city, data.number_of_beds, data.description);

        data = await hut.getHutById(2);
        let hut_check2 = new Hut(data.id, data.name, data.latitude, data.longitude, data.altitude, data.type, data.region, data.province, data.city, data.number_of_beds, data.description);

        data = await hut.getHutById(3);
        let hut_check3 = new Hut(data.id, data.name, data.latitude, data.longitude, data.altitude, data.type, data.region, data.province, data.city, data.number_of_beds, data.description);
        expect(hut1).toEqual(hut_check1);
        expect(hut2).toEqual(hut_check2);
        expect(hut3).toEqual(hut_check3);

        data = await hut.getHutById(-1);
        expect(data).toBe(undefined);

        data = await hut.getHutById(4);
        expect(data).toBe(undefined);
    });
})