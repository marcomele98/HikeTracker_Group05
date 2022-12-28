'use strict';
const daoUtility = require('../utilities/daoUtilities');
const preferences = require('../Queries/preferences');
const prefObjects = require('../testObjects/preferences');

describe("Preferences test", () => {
    beforeEach(async () => {
        await daoUtility.resetDB();
        await daoUtility.createMarioRossi();
        await daoUtility.createLuigiVerdi();
        await daoUtility.createGiulioLiso();
        await daoUtility.savePreferencesForLuigiVerdi();
        await daoUtility.savePreferencesForGiulioLiso();
    });

    afterEach(async () => {
        await daoUtility.resetDB();
    });

    test('Test get hiker preferences', async () => {

        let data;
        let preferences_check;

        data = await preferences.getPreferencesByUserId(2);
        preferences_check = prefObjects.preferences1;
        expect(data).toEqual(preferences_check);

        data = await preferences.getPreferencesByUserId(3);
        preferences_check = prefObjects.preferences3;
        expect(data).toEqual(preferences_check);

        data = await preferences.getPreferencesByUserId(1);
        expect(data).toBe(undefined);
    });

    test('Test insert and delete hiker preferences', async () => {
        let data = await preferences.getPreferencesByUserId(2);
        let preferences_check = prefObjects.preferences1;
        expect(data).toEqual(preferences_check);

        await preferences.deletePreferences(2);
        let data2 = await preferences.getPreferencesByUserId(2);
        expect(data2).toBe(undefined);

        await preferences.addPreferences(prefObjects.preferences2, 2);
        let data3 = await preferences.getPreferencesByUserId(2);
        let preferences_check3 = prefObjects.preferences2;
        expect(data3).toEqual(preferences_check3);
    });
});