"use strict";

const preferencesDB = require('../Queries/preferences');

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


}

module.exports.Preferences = Preferences;