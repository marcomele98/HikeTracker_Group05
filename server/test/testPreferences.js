const chaiUtility = require('../utilities/chaiUtilities');
const testUtility = require('../utilities/apiTestUtilities');

describe('get hiker preferences', () => {
    beforeEach(async () => {
        await testUtility.setupPreferences();
    });
    afterEach(async () => {
        await testUtility.reset();
    });
    
    getPreferencesByUserId(404, 1);
    getPreferencesByUserId(200, 2);
    getPreferencesByUserId(404, 100);

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