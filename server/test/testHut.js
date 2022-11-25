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
describe('test huts', () => {
    beforeEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run("INSERT INTO USER (id, name, surname, role, password, email, salt, phone_number)\
        VALUES(1, 'Mario', 'Rossi', 'local guide', \
        'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
        'lg1@p.it', '4783473632662333', '3334567980'),\
        (2, 'Luigi', 'Verdi', 'hiker', \
        '47b5880cd28fb469b027514f66ea88bb70cfdc09f74da5b57cf10a5e99f79987', \
        'h1@p.it', '7753261635033673', '3334567981')");

        await login()
    });
    afterEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
    });

    // let user1 = {
    //     "username": "lg1@p.it",
    //     "password": "password"
    // };

    let user2 = {
        "username": "h1@p.it",
        "password": "password"
    };

    let hut = {
        'name': 'Agririfugio Molini',
        'latitude': '44.31912',
        'longitude': '9.178627',
        'altitude': '232',
        'type': 'Refuge',
        'region': 'Liguria',
        'province': 'GE',
        'city': 'Fruttuoso',
        'number_of_beds': 11,
        'description': 'Set on a hillside overlooking the Ligurian coast, this quiet, secluded farmhouse within Portofino Natural Park is only accessible via hiking trails.'
    };

                    

    let hut1 = {
        'name': 'Refuge La Riposa',
        'latitude': '45.17778',
        'longitude': '7.08337',
        'altitude': '2185',
        'type': 'Refuge',
        'region': 'Piemonte',
        'province': 'TO',
        'city': 'Mompantero',
        'number_of_beds': 20,
        'description': 'prova1'
    }

    let hut2 ={
        'name': 'Rifugio Asti',
        'latitude': '45.19177',
        'longitude': '7.07427',
        'altitude': '2854',
        'type': 'Refuge',
        'region': 'Piemonte',
        'province': 'TO',
        'city': 'Mompantero',
        'number_of_beds': 15,
        'description': 'prova2'
    }

    let hut3 = {
        'name': 'Rifugio Duca degli Abruzzi',
        'latitude': '45.958891',
        'longitude': '7.6441',
        'altitude': '2798.2',
        'type': 'Refuge',
        'region': 'Valle d Aosta',
        'province': 'AO',
        'city': 'Breuil-Cervinia',
        'number_of_beds': 22,
        'description': 'prova3'
    }

    let hut4 = {
        'name': 'Rifugio Sempronio',
        'latitude': '45.312451',
        'longitude': '7.1000',
        'altitude': '2702.1',
        'type': 'Refuge',
        'region': 'Valle d Aosta',
        'province': 'AO',
        'city': 'Gressonet',
        'number_of_beds': 16,
        'description': 'prova4'
    }

    newHut(201, hut, userCredentials);
    // newHut(401, hut, user2);
    newHut(422, {...hut, name: undefined}, userCredentials);
    newHut(422, {...hut, latitude: ''}, userCredentials);
    // newHut(401, {...hut, name: undefined}, user2);
    newHut(422, {...hut, province: ''}, userCredentials);

    getAllHuts(200, hut1, hut2, hut3, hut4);
    getHutById(0, hut1, hut2, hut3, hut4);
    getHutById(1, hut1, hut2, hut3, hut4);
    getHutById(2, hut1, hut2, hut3, hut4);
    getHutById(3, hut1, hut2, hut3, hut4);
    getHutById(4, hut1, hut2, hut3, hut4);
    getHutById(-1, hut1, hut2, hut3, hut4);
    getHutById(100, hut1, hut2, hut3, hut4);
});

function getAllHuts(expectedHTTPStatus, huts1, huts2, huts3, huts4) {
    it('Getting all huts', function (done) {
        agent.post('/api/hut')
            .send(huts1)
            .then(function (res) {
                res.should.have.status(201);
                agent.post('/api/hut')
                    .send(huts2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        agent.post('/api/hut')
                            .send(huts3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                agent.post('/api/hut')
                                    .send(huts4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        agent.get('/api/huts')
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
        agent.post('/api/hut')
            .send(hut1)
            .then(function (res) {
                res.should.have.status(201);
                agent.post('/api/hut')
                    .send(hut2)
                    .then(function (res1) {
                        res1.should.have.status(201);
                        agent.post('/api/hut')
                            .send(hut3)
                            .then(function (res2) {
                                res2.should.have.status(201);
                                agent.post('/api/hut')
                                    .send(hut4)
                                    .then(function (res3) {
                                        res3.should.have.status(201);
                                        agent.get('/api/hut/' + id)
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


function newHut(expectedHTTPStatus, hut, user) {
    it('adding a new hut description',  function (done) {
        // await login(user);
        agent.post('/api/hut')
            .send(hut)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
}

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