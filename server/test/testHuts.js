const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const db = require('../Queries/DAO');
const app = require('../index.js');
const { expect } = require("chai");
var agent = chai.request.agent(app);

//Insert some objects for future tests
let user_lg = {
    "username": "lg1@p.it",
    "password": "password"
}

let user_hiker = {
    "username": "h1@p.it",
    "password": "password"
}

describe('test huts apis', () => {
    beforeEach(async () => {
        await logout();
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM PARKING_LOT');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM sqlite_sequence');
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Mario', 'Rossi', 'local guide', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'lg1@p.it', '4783473632662333', '3334567980')"
        );
        await db.run(
            "INSERT OR IGNORE INTO USER(name, surname, role, password, email, salt, phone_number)\
               VALUES ('Giulio', 'Liso', 'hiker', \
                      'df34c7212613dcb7c25593f91fbb74fb99793a440a2b9fe8972cbadb0436a333', \
                      'h1@p.it', '4783473632662333', '3334567980')"
        );

        await db.run(
            "INSERT INTO HUT(id,name,latitude, longitude, altitude, type, region, province, city, number_of_beds, description)\
            VALUES  (1, 'Refuge La Riposa','45.17778', '7.08337', '2185','Refuge', 'Piemonte', 'TO','Mompantero', 20, 'prova1'),\
                    (2, 'Refugio Asti'   ,'45.19177', '7.07427','2854','Refuge', 'Piemonte', 'TO','Mompantero', 15, 'prova2'),\
                    (3, 'Rifugio Duca degli Abruzzi','45.958891','7.6441','2798.2','Refuge','Valle d Aosta','AO','Breuil-Cervinia',22,'prova3')"
        );

    });

    afterEach(async () => {
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HUT');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM sqlite_sequence');
        await logout();
    });

    getHuts();
    getHutById(1);
    getHutById(2);
    getHutById(3);
    getHutById(-1);
    getHutById(4);

})

function getHuts () {
    it('Getting all huts', function() {
        return agent.get('/api/huts')
        .then(function (res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.length(3);
        });
    });
};

function getHutById (id) {
    it('Get hut specified by id', function () {
        return agent.get('/api/hut/' + id)
        .then(function (res) {
            if(id > 0 && id <= 3) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('id').eq(id);
                res.body.should.have.property('name');
                res.body.should.have.property('latitude');
                res.body.should.have.property('longitude');
                res.body.should.have.property('altitude');
                res.body.should.have.property('type');
                res.body.should.have.property('region');
                res.body.should.have.property('province');
                res.body.should.have.property('city');
                res.body.should.have.property('number_of_beds');
                res.body.should.have.property('description');
            } else {
                res.should.have.status(404);
            }
        });
    });
};


async function logout() {
    await agent.delete('/api/sessions/current')
}


async function login(user) {
    await agent.post('/api/sessions')
    .send(user)
}