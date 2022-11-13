const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const sqlite = require('sqlite3');


const db = new sqlite.Database('HT.sqlite', (err) => {
    if (err) throw err;
});

const app = require('../index.js');
var agent = chai.request.agent(app);

describe('test user registration', () => {
    db.run('DELETE FROM USER')
    registerNewUser(201, 'Giorgio', 'Vanni', 'local guide', 'password', 'giorgiovanni@gmail.com', '3346254783');
    registerNewUser(400, 'Marco', undefined, 'hiker', 'password', 'marcoundefined@gmail.com', '3227672453');
    registerNewUser(400, 'Giorgio', 'Vanni', 'local guide', 'password', 'giorgiovanni@gmail.com', '3346254783');
    registerNewUser(400, 'Marco', 'Rossu', 'hiker', 'password', 'marcorossigmail.com', '3227672453');
    registerNewUser(400, 'Marco', 'Rossu', 'hiker', undefined, 'marcorossigmail.com', '3227672453');
});

function registerNewUser(expectedHTTPStatus, name, surname, role, password, email, phone_number) {
    it('registering a new user', function (done) {
        let user = {name: name, surname: surname, role: role, password: password, email: email, phone_number: phone_number};
        agent.post('/api/register')
        .send(user)
        .then(function (res) {
            res.should.have.status(expectedHTTPStatus);
            done();
        });
    });
}