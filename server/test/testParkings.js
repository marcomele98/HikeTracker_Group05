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
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run("INSERT INTO USER (id, name, surname, role, password, email, salt, phone_number)\
        VALUES(1, 'Mario', 'Rossi', 'local guide', \
        'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
        'lg1@p.it', '4783473632662333', '3334567980')");
        await login()
    });
    afterEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
    });

    let parking1 = {
        "name": "Piazzale di Valdinferno",
        "latitude": "44.19296",
        "longitude": "7.95501",
        "altitude": "1192",
        "region": "Piemonte",
        "province": "CN",
        "city": "Garessio"
    }

    let parking2 = {
        "name": "Parking Garessio 200",
        "latitude": '44.21653',
        "longitude": '7.94425',
        "altitude": '1392',
        "region": "Piemonte",
        "province": "CN",
        "city": "Garessio"
    }

    let parking3 = {
        "name": 'Parking Colletta di Castelbianco',
        "latitude": '44.11318',
        "longitude": '8.06597',
        "altitude": '235',
        "region": 'Liguria',
        "province": 'SV',
        "city": 'Castelbianco'
    }

    let parking4 = {
        "name": 'Parking place Malga Grassi',
        "latitude": '45.922613',
        "longitude": '10.785626',
        "altitude": '1040',
        "region": 'Trentino-Alto Adige',
        "province": 'TN',
        "city": 'Riva del Garda'
    }



    newParkingLot(201, 'Piazza Castello', '45.86524', '9.23645', '130', 'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, undefined, '45.86524', '9.23645', '130', 'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, 'Piazza Castelo', undefined, '9.23645', '130', 'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, 'Piazza Castllo', '45.86524', '9.23645', '130', 'Piemonte', 'AL', undefined);
    newParkingLot(422, 'Piazza Castell', '45.86524', '9.23645', '', 'Piemonte', 'AL', 'Casale Monferrato');

    getAllParkings(200, parking1, parking2, parking3, parking4);
    getParkingLotById(0, parking1, parking2, parking3, parking4);
    getParkingLotById(1, parking1, parking2, parking3, parking4);
    getParkingLotById(2, parking1, parking2, parking3, parking4);
    getParkingLotById(3, parking1, parking2, parking3, parking4);
    getParkingLotById(4, parking1, parking2, parking3, parking4);
    getParkingLotById(5, parking1, parking2, parking3, parking4);
    getParkingLotById(6, parking1, parking2, parking3, parking4);
    getParkingLotById(7, parking1, parking2, parking3, parking4);
    getParkingLotById(8, parking1, parking2, parking3, parking4);
    getParkingLotById(9, parking1, parking2, parking3, parking4);
    getParkingLotById(10, parking1, parking2, parking3, parking4);
    getParkingLotById(100, parking1, parking2, parking3, parking4);

});

function newParkingLot(expectedHTTPStatus, name, latitude, longitude, altitude, region, province, city) {
    it('adding a new Parking lot', function (done) {
        let parking_lot = { name: name, latitude: latitude, longitude: longitude, altitude: altitude, region: region, province: province, city: city };
        agent.post('/api/parkingLot').send(parking_lot)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done()
            });
    });
};

function getAllParkings(expectedHTTPStatus, parking1, parking2, parking3, parking4) {
    it('Getting all parking lots', function (done) {
        agent.post('/api/parkingLot')
            .send(parking1)
            .then(function (res) {
                res.should.have.status(201);
                agent.post('/api/parkingLot')
                    .send(parking2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        agent.post('/api/parkingLot')
                            .send(parking3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                agent.post('/api/parkingLot')
                                    .send(parking4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        agent.get('/api/parkingLots')
                                            .then(function (res4) {
                                                res4.should.have.status(expectedHTTPStatus);
                                                res4.body.should.have.length(4);
                                                done()
                                            });
                                    });
                            });
                    });
            });
    });
};

function getParkingLotById(id, parking1, parking2, parking3, parking4) {
    it('Get parking lot specified by id', function (done) {
        agent.post('/api/parkingLot')
            .send(parking1)
            .then(function (res) {
                res.should.have.status(201);
                agent.post('/api/parkingLot')
                    .send(parking2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        agent.post('/api/parkingLot')
                            .send(parking3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                agent.post('/api/parkingLot')
                                    .send(parking4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        agent.get('/api/parkingLot/' + id)
                                            .then(function (res4) {
                                                if (id > 0 && id <= 4) {
                                                    res4.should.have.status(200);
                                                    res4.body.id.should.equal(id);
                                                    done();
                                                } else {
                                                    res4.should.have.status(404);
                                                    done()
                                                }
                                            });
                                    })
                            });
                    });
            });
    });
};

async function logout() {
    await agent.delete('/api/sessions/current')
}

async function login() {
    await agent.post('/api/sessions')
        .send(userCredentials)
        .then(function (res) {
            res.should.have.status(200);
        });
}
