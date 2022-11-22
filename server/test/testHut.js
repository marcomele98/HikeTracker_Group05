const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const db = require('../Queries/DAO');
const app = require('../index.js');
const { expect } = require("chai");
var agent = chai.request.agent(app);

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
    });
    afterEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM USER');
        await db.run('DELETE FROM sqlite_sequence');
    });

    let user1 = {
        "username": "lg1@p.it",
        "password": "password"
    };

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

    newHut(201, hut, user1);
    newHut(401, hut, user2);
    newHut(422, {...hut, name: undefined}, user1);
    newHut(422, {...hut, latitude: ''}, user1);
    newHut(401, {...hut, name: undefined}, user2);
    newHut(422, {...hut, province: ''}, user1);
});

function newHut(expectedHTTPStatus, hut, user) {
    it('adding a new hut description', async function () {
        await login(user);
        return agent.post('/api/hut')
            .send(hut)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

async function logout() {
    return agent.delete('/api/sessions/current')
};


async function login(user) {
    return agent.post('/api/sessions')
    .send(user)
    .then(function (res) {res.should.have.status(200);});
};