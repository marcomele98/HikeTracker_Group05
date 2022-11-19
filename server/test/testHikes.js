const chai = require("chai");
const chaiHttp = require("chai-http");
const { INTERNAL } = require("sqlite3");
chai.use(chaiHttp);
chai.should();

const app = require('../index');
var agent = chai.request.agent(app);
const db = require('../Queries/DAO');


describe('test hikes apis', () => {
    beforeEach(async () => {
        await db.run('DELETE FROM HIKE');
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

        await db.run("INSERT INTO HIKE(id, title, length_kms, expected_mins, ascendent_meters, difficulty, region, province, city, lg_id, gpx, end_point, end_point_type, start_point, start_point_type, description)\
                VALUES (1, 'ROCCIAMELONE', 9, 420, 3538, 'Professional Hiker', 'Piemonte', 'TO', 'Montepantero', 1, 'gpx_content', 1, 'point', 2, 'parking_lot', ''),\
                (2, 'Salita al Monte Antoroto', 17, 444, 400, 'Professional Hiker', 'Piemonte', 'CN', 'Garessio', 1, 'gpx_content', 1, 'parking_lot', 3, 'parking_lot', '')\
        ");

        /*db.run("INSERT INTO HIKE_HUT(hike_id, hut_id)\
                VALUES(1, 1),\
                (2, 2)\
        ");

        db.run("INSERT INTO HIKE_PARKING(hike_id, parking_id)\
                VALUES(1, 1),\
                (2, 2)\
        ");

        db.run("INSERT INTO POINT(id, latitude, longitude, altitude, name, address, hike_id )\
                VALUES (1, '45.20353', '7.07734', '3538', 'Rocciamelone','Rocciamelone, Piedmont', 1),\
               (2, '44.20647', '7.92800', '5300', 'La pianura dalle Alpi Liguri','Garessio, Cuneo, Piedmont', 2 ),\
        ")*/
    });

    afterEach(async () => {
        await db.run('DELETE FROM HIKE');
        await db.run('DELETE FROM HIKE_HUT');
        await db.run('DELETE FROM HIKE_PARKING');
        await db.run('DELETE FROM POINT');
        await db.run('DELETE FROM sqlite_sequence');

    });
    
    getHikes();
    getHikeById(0);
    getHikeById(1);
    getHikeById(2);
    getHikeById(10);
    newHikeDescription();
})



function getHikes () {
    it('Getting all hikes', function() {
        return agent.get('/api/hikes')
        .then(function (res) {
            res.should.have.status(200);
            res.body.should.have.length(2);
        });
    });
};

function getHikeById (id) {
    it('Get hike specified by id', function () {
        return agent.get('/api/hike/' + id)
        .then(function (res) {
            if(id > 0 && id <= 2) {
                res.should.have.status(200);
                res.body.id.should.equal(id);
            } else {
                res.should.have.status(404);
            }
        });
    });
};

function newHikeDescription(expectedHTTPStatus, title,length_km,expected_mins, ascendent_meters, difficulty, province,city,gpx,end_point,start_point,reference_points) {
    it('adding a new hike description', async function () {
        let hike = { title: title, length_km: length_km, expected_mins: expected_mins, ascendent_meters:ascendent_meters,difficulty: difficulty, province:province,
            city:city,gpx: gpx,end_point:end_point,start_point:start_point,reference_points:reference_points,}
        agent.post('/api/hike')
            .send(hike)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                
            });
    });
}

