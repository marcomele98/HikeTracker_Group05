const parkObject = require('../testObjects/parks');

const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');

describe('test parking lots', () => {
    beforeEach(async () => {
        await testUtility.setup();
    });
    afterEach(async () => {
        await testUtility.reset();
    });

    newParkingLot(201, 'Piazza Castello', '45.86524', '9.23645', '130', 22,'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, undefined, '45.86524', '9.23645', '130',11, 'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, 'Piazza Castelo', undefined, '9.23645', '130', 30, 'Piemonte', 'AL', 'Casale Monferrato');
    newParkingLot(422, 'Piazza Castllo', '45.86524', '9.23645', '130',undefined, 'Piemonte', 'AL', undefined);
    newParkingLot(422, 'Piazza Castell', '45.86524', '9.23645', '',10, 'Piemonte', 'AL', 'Casale Monferrato');

    getAllParkings(200, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(0, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(1, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(2, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(3, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(4, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(5, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(6, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(7, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(8, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(9, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(10, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);
    getParkingLotById(100, parkObject.park, parkObject.park2, parkObject.park3, parkObject.park4);

});

function newParkingLot(expectedHTTPStatus, name, latitude, longitude, altitude,capacity, region, province, city) {
    it('adding a new Parking lot', function (done) {
        let parking_lot = { name: name, latitude: latitude, longitude: longitude, altitude: altitude, capacity:capacity, region: region, province: province, city: city };
        chaiUtility.agent.post('/api/parkingLot').send(parking_lot)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done()
            });
    });
};

function getAllParkings(expectedHTTPStatus, parking1, parking2, parking3, parking4) {
    it('Getting all parking lots', function (done) {
        chaiUtility.agent.post('/api/parkingLot')
            .send(parking1)
            .then(function (res) {
                res.should.have.status(201);
                chaiUtility.agent.post('/api/parkingLot')
                    .send(parking2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        chaiUtility.agent.post('/api/parkingLot')
                            .send(parking3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                chaiUtility.agent.post('/api/parkingLot')
                                    .send(parking4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        chaiUtility.agent.get('/api/parkingLots')
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
        chaiUtility.agent.post('/api/parkingLot')
            .send(parking1)
            .then(function (res) {
                res.should.have.status(201);
                chaiUtility.agent.post('/api/parkingLot')
                    .send(parking2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        chaiUtility.agent.post('/api/parkingLot')
                            .send(parking3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                chaiUtility.agent.post('/api/parkingLot')
                                    .send(parking4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        chaiUtility.agent.get('/api/parkingLot/' + id)
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
