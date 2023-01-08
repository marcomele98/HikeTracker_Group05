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

        message = prefrencesStructCheck(preference);

        if(message){
            return res.status(422).json(message);
        }

        try{
            let oldPreference = await preferencesDB.getPreferencesByUserId(id);
            if (!oldPreference) {
                await preferencesDB.addPreferences(preference,id);
            }
            else{
                await preferencesDB.deletePreferences(id);
                await preferencesDB.addPreferences(preference,id);
            }
                
            return res.status(201).end();

        }
        catch (err) {
            console.log(err)
            message = "Server error"
            return res.status(503).json(message)
        }

    }


}

function prefrencesStructCheck (preference)
{
    let message = ""
    let message1 = ""

    if (servicesUtility.isNotValidBody(preference)) {
        message = "Invalid Body"
    }

    if (preference.max_length_kms && servicesUtility.isNotValidNumber(preference.max_length_kms)) {
        message = "Invalid Maximum Length"
    }

    if (preference.min_length_kms && servicesUtility.isNotValidNumber(preference.min_length_kms)) {
        message = "Invalid Minimum Length"
    }

    if (preference.max_expected_mins && servicesUtility.isNotValidNumber(preference.max_expected_mins)) {
        message = "Invalid Maximum Expected Time"
    }

    if (preference.min_expected_mins && servicesUtility.isNotValidNumber(preference.min_expected_mins)) {
        message = "Invalid Minimum Expected Time"
    }

    if (preference.max_ascendent_meters && servicesUtility.isNotValidNumber(preference.max_ascendent_meters)) {
        message = "Invalid Maximum Ascent"
    }

    if (preference.min_ascendent_meters && servicesUtility.isNotValidNumber(preference.min_ascendent_meters)) {
        message = "Invalid Minimum Ascent"
    }

    message1 = prefrencesLocationCheck (preference);

    (message1) ? message =  message1 : false;

    return message;
}

function prefrencesLocationCheck (preference)
{
    let message = ""

    if (preference.max_difficulty && servicesUtility.isNotValidDiff(preference.max_difficulty)) {
        message = "Invalid Maximum Difficulty"
    }

    if (preference.min_difficulty && servicesUtility.isNotValidDiff(preference.min_difficulty)) {
        message = "Invalid Minimum Difficulty"
    }

    if (preference.radius && servicesUtility.isNotValidNumber(preference.radius)) {
        message = "Invalid Radius"
    }

    if (preference.region && servicesUtility.isNotValidField(preference.region)) {
        message = "Invalid Region"
    }

    if (preference.province && servicesUtility.isNotValidProvince(preference.province)) {
        message = "Invalid Province"
    }

    if (preference.city && servicesUtility.isNotValidField(preference.city)) {
        message = "Invalid City"
    }

    if (preference.point_latitude && preference.point_longitude && servicesUtility.isNotValidPointUser({...preference})) {
        message = "Invalid point"
    }

    return message;
}

module.exports.Preferences = Preferences;