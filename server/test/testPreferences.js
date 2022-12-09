const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');
const preferencesObject = require('../testObjects/preferences');

describe('get hiker preferences', () => {
    beforeEach(async () => {
        await testUtility.setupPreferences();
    });
    afterEach(async () => {
        await testUtility.reset();
    });
    
    getPreferencesByUserId(404, 1);
    getPreferencesByUserId(200, 2);
    getPreferencesByUserId(200, 3);
    getPreferencesByUserId(404, 100);

    newPreferencesForUser(201, preferencesObject.preferences1);
    newPreferencesForUser(201, preferencesObject.preferences2);
    newPreferencesForUser(422, preferencesObject.wrongPreferences1);
    newPreferencesForUser(422, preferencesObject.wrongPreferences2);

});

function getPreferencesByUserId(expectedHTTPStatus, user_id) {
    it('get preferences by user id', function (done) {
        chaiUtility.agent.get('/api/preferences/' + user_id)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                if (expectedHTTPStatus === 200) {
                    res.body.user_id.should.equal(user_id);
                }
                done();
            });
    });
}

function newPreferencesForUser(expectedHTTPStatus, preferences) {
    it('adding a new preferences for the user',  function (done) {
        chaiUtility.agent.post('/api/preferences')
            .send(preferences)
            .then(function (res) {
                res.should.have.status(expectedHTTPStatus);
                done();
            });
    });
}