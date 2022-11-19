const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const db = require('../Queries/DAO');
const app = require('../index.js');
const { expect } = require("chai");
var agent = chai.request.agent(app);

const userCredentials = {
    username: "lg1@p.it",
    password: "password"
}


describe('test parking lots', () => {
    beforeEach(async () => {
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run("INSERT INTO USER (id, name, surname, role, password, email, salt, phone_number)\
        VALUES(1, 'Mario', 'Rossi', 'local guide', \
        'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
        'lg1@p.it', '4783473632662333', '3334567980')");
        await db.run("INSERT INTO PARKING_LOT(name, latitude, longitude, altitude, region, province, city)\
                    VALUES('Piazzale di Valdinferno','44.19296','7.95501','1192','Piemonte', 'CN','Garessio'),\
                    ('Parking Garessio 200','44.21653','7.94425','1392','Piemonte', 'CN','Garessio'),\
                    ('Parking Colletta di Castelbianco','44.11318','8.06597','235','Liguria', 'SV', 'Castelbianco'),\
                    ('Parking place Malga Grassi','45.922613','10.785626','1040','Trentino-Alto Adige','TN','Riva del Garda'),\
                    ('Parking place at the bridge','45.920872','10.889628','88','Trentino-Alto Adige','TN','Riva del Garda'),\
                    ('harbour Porto San Nicolo', '45.87738','10.857294','88','Trentino-Alto Adige','TN','Riva del Garda'),\
                    ('Parcheggio lungo via Gaixella','44.332855','9.171204','422', 'Liguria', 'GE', 'Portofino'),\
                    ('Piazza Paccini','44.002909','8.170033','16', 'Liguria', 'IM', 'San Lorenzo al Mare')");

        await agent.post('/api/sessions').send(userCredentials).then(function (res) {res.should.have.status(200);});
    });
    afterEach(async () => {
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
    });
    
    newParkingLot(201, 'Piazza Castello', '45.86524', '9.23645','130','Piemonte','AL','Casale Monferrato');
    newParkingLot(422, undefined, '45.86524', '9.23645','130','Piemonte','AL','Casale Monferrato');
    newParkingLot(422, 'Piazza Castelo', undefined, '9.23645','130','Piemonte','AL','Casale Monferrato');
    newParkingLot(422, 'Piazza Castllo', '45.86524', '9.23645','130','Piemonte','AL',undefined);
    newParkingLot(422, 'Piazza Castell', '45.86524', '9.23645','','Piemonte','AL','Casale Monferrato');

    getAllParkings();
    getParkingLotById(0);
    getParkingLotById(1);
    getParkingLotById(2);
    getParkingLotById(3);
    getParkingLotById(4);
    getParkingLotById(5);
    getParkingLotById(6);
    getParkingLotById(7);
    getParkingLotById(8);
    getParkingLotById(9);
    getParkingLotById(10);
    getParkingLotById(100);

});

function newParkingLot (expectedHTTPStatus, name, latitude, longitude, altitude, region, province, city) {
    it('adding a new Parking lot', function () {
        let parking_lot = {name: name, latitude: latitude, longitude: longitude, altitude: altitude, region: region, province: province, city: city};
        return agent.post('/api/parkingLot').send(parking_lot)
        .then(function (res) {
            res.should.have.status(expectedHTTPStatus);
        });
    });
};

function getAllParkings () {
    it('Getting all parking lots', function() {
        return agent.get('/api/parkingLots')
        .then(function (res) {
            res.should.have.status(200);
            res.body.should.have.length(8);
        });
    });
};

function getParkingLotById (id) {
    it('Get parking lot specified by id', function () {
        return agent.get('/api/parkingLot/' + id)
        .then(function (res) {
            if(id > 0 && id <= 8) {
                res.should.have.status(200);
                res.body.id.should.equal(id);
            } else {
                res.should.have.status(404);
            }
        });
    });
};