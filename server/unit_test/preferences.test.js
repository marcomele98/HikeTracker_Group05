'use strict';
const daoUtility = require('../utilities/daoUtilities');
const preferences = require('../Queries/preferences');

describe("User test", () => {
    beforeAll(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
        await daoUtility.createLuigiVerdi();
        await daoUtility.savePreferencesForLuigiVerdi();
    });

    afterAll(async () => {
        await daoUtility.resetDB();
    });



    function Preferences(user_id, max_length_kms, min_length_kms, max_expected_mins, min_expected_mins,
        max_ascendent_meters, min_ascendent_meters, max_difficulty, min_difficulty, point_latitude, point_longitude, radius,
        region, province, city) {
        this.user_id = user_id;
        this.max_length_kms = max_length_kms;
        this.min_length_kms = min_length_kms;
        this.max_expected_mins = max_expected_mins;
        this.min_expected_mins = min_expected_mins;
        this.max_ascendent_meters = max_ascendent_meters;
        this.min_ascendent_meters = min_ascendent_meters;
        this.max_difficulty = max_difficulty;
        this.min_difficulty = min_difficulty;
        this.point_latitude = point_latitude;
        this.point_longitude = point_longitude;
        this.radius = radius;
        this.region = region;
        this.province = province;
        this.city = city;
    }

    test('Test hiker preferences', async () => {

        let data = await preferences.getPreferencesByUserId(2);
        let preferences1 = new Preferences(data.user_id, data.max_length_kms, data.min_length_kms, data.max_expected_mins,
            data.min_expected_mins, data.max_ascendent_meters, data.min_ascendent_meters, data.max_difficulty, data.min_difficulty,
            data.point_latitude, data.point_longitude, data.radius, data.region, data.province, data.city);

        let preferences_check = new Preferences(
            2, 
            200, 
            110, 
            200, 
            100, 
            120, 
            100, 
            'Hiker',
            'Hiker',  
            '44.21736', 
            '7.94432',
            10, 
            'Piemonte', 
            'CN', 
            'Garessio'
        );
        expect(preferences1).toEqual(preferences_check);

        data = await preferences.getPreferencesByUserId(1);
        expect(data).toBe(undefined);
    });
});