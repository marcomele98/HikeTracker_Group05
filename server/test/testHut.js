const hutObject = require('../testObjects/hut');

const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');

describe('test huts', () => {
    beforeEach(async () => {
        await testUtility.setup();      
    });
    afterEach(async () => {
        await testUtility.reset();
    });

    newHut(201, hutObject.hut2);
    newHut(201, {...hutObject.hut2, phone: undefined});
    newHut(201, {...hutObject.hut2, email: undefined});
    newHut(422, {...hutObject.hut2, phone: 's78907654'});
    newHut(422, {...hutObject.hut2, email: 'invalidmail.com'});
    newHut(422, {...hutObject.hut2, name: undefined});
    newHut(422, {...hutObject.hut2, latitude: ''});
    newHut(422, {...hutObject.hut2, province: ''});

    getAllHuts(200, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(0, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(1, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(2, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(3, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(4, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(-1, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
    getHutById(100, hutObject.hut, hutObject.hut3, hutObject.hut4, hutObject.hut5);
});

function getAllHuts(expectedHTTPStatus, huts1, huts2, huts3, huts4) {
    it('Getting all huts', function (done) {
        chaiUtility.agent.post('/api/hut')
            .send(huts1)
            .then(function (res) {
                res.should.have.status(201);
                chaiUtility.agent.post('/api/hut')
                    .send(huts2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        chaiUtility.agent.post('/api/hut')
                            .send(huts3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                chaiUtility.agent.post('/api/hut')
                                    .send(huts4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        chaiUtility.agent.get('/api/huts')
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

function getHutById(id, hut1, hut2, hut3, hut4) {
    it('Get hut specified by id', function (done) {
        chaiUtility.agent.post('/api/hut')
            .send(hut1)
            .then(function (res) {
                res.should.have.status(201);
                chaiUtility.agent.post('/api/hut')
                    .send(hut2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        chaiUtility.agent.post('/api/hut')
                            .send(hut3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                chaiUtility.agent.post('/api/hut')
                                    .send(hut4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        chaiUtility.agent.get('/api/hut/' + id)
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


function newHut(expectedHTTPStatus, hut) {
    it('adding a new hut description',  function (done) {
        chaiUtility.agent.post('/api/hut')
            .send(hut)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
}