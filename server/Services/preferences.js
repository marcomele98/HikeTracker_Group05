"use strict";

const preferencesDB = require('../Queries/preferences');
const servicesUtility = require('../utilities/servicesUtilities')
class Preferences{

    async getPreferencesByUserId(req, res) {

        try {
            let preferences = await preferencesDB.getPreferencesByUserId(req.params.userId)
            if (preferences === undefined) {
                return res.status(404).json({ error: `Preferences not found for this user` }); // not found
            }
            return res.status(200).json(preferences);
        } catch (err) {
            return res.status(500).end();
        }
    };

    async addPreferences(req,res){

        let preference = req.body;
        let id = req.user.id;
        let role = req.user.role;
        let message = ""

        if (role !== "hiker") {
            return res.status(401).json("Not authenticated.");
        }

        if (servicesUtility.isNotValidBody(preference)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.max_length_kms)) {
            message = "Invalid Maximum Length"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.min_length_kms)) {
            message = "Invalid Minimum Length"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.max_expected_mins)) {
            message = "Invalid Maximum Expected Time"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.min_expected_mins)) {
            message = "Invalid Minimum Expected Time"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.max_ascendent_meters)) {
            message = "Invalid Maximum Ascent"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.min_ascendent_meters)) {
            message = "Invalid Minimum Ascent"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidDiff(preference.max_difficulty)) {
            message = "Invalid Maximum Difficulty"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidDiff(preference.min_difficulty)) {
            message = "Invalid Minimum Difficulty"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidNumber(preference.radius)) {
            message = "Invalid Radius"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(preference.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidProvince(preference.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(preference.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidPointUser({...preference})) {
            message = "Invalid point"
            return res.status(422).json(message);
        }

        try{
            let oldPreference = await preferencesDB.getPreferencesByUserId(id);
            if (oldPreference === undefined) {
                await preferencesDB.addPreferences(preference,id);
            }
            else{
                await preferencesDB.deletePreferences(id);
                await preferencesDB.addPreferences(preference,id);
            }
                
            return res.status(201).end();

        }
        catch (err) {
            message = "Server error"
            return res.status(503).json(message)
        }

    }


}

module.exports.Preferences = Preferences;