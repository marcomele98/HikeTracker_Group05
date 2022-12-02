const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');

describe('test user registration', () => {
    beforeEach(async () => {
        await testUtility.setup();
    });
    afterEach(async () => {
        await testUtility.reset();
    });
    registerNewUser(201, 'Giorgio', 'Vanni', 'local guide', 'password', 'giorgiovanni@gmail.com', '3346254783');
    registerNewUser(400, 'Marco', undefined, 'hiker', 'password', 'marcoundefined@gmail.com', '3227672453');
    registerTwoTimeNewUser(400, 'Giorgio', 'Vanni', 'local guide', 'password', 'giorgiovanni@gmail.com', '3346254783');
    registerNewUser(400, 'Marco', 'Rossu', 'hiker', 'password', 'marcorossigmail.com', '3227672453');
    registerNewUser(400, 'Marco', 'Rossu', 'hiker', undefined, 'marcorossigmail.com', '3227672453');
});

function registerNewUser(expectedHTTPStatus, name, surname, role, password, email, phone_number) {
    it('registering a new user', function (done) {
        let user = { name: name, surname: surname, role: role, password: password, email: email, phone_number: phone_number };
        chaiUtility.agent.post('/api/register')
            .send(user)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done()
            });
    });
}

function registerTwoTimeNewUser(expectedHTTPStatus, name, surname, role, password, email, phone_number) {
    it('registering two time a new user', function (done) {
        let user = { name: name, surname: surname, role: role, password: password, email: email, phone_number: phone_number };
        chaiUtility.agent.post('/api/register')
            .send(user)
            .then(function () {
                let user = { name: name, surname: surname, role: role, password: password, email: email, phone_number: phone_number };
                chaiUtility.agent.post('/api/register')
                    .send(user)
                    .then(function (res) {
                        res.should.have.status(expectedHTTPStatus);
                        done()
                    });
            });
    });
}