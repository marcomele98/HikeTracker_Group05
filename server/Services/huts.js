"use strict"
const hutDB = require('../Queries/hut');
const servicesUtility = require('../utilities/servicesUtilities')

class HutDescription {

    constructor() { }

    async addHutDescription(req, res)
    {
        let hut = req.body;
        let role = req.user.role;
        let message = "";

        if (role !== "local guide") {
            return res.status(401).json("Not authenticated.");
        }

        if (servicesUtility.isNotValidBody(hut)) {
            message = "Invalid Body"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(hut.name)) {
            message = "Invalid Name"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(hut.type)) {
            message = "Invalid Type"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidPoint({...hut})) {
            message = "Invalid point"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(hut.region)) {
            message = "Invalid Region"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidProvince(hut.province)) {
            message = "Invalid Province"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(hut.city)) {
            message = "Invalid City"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidPhone(hut.phone)) {
            message = "Invalid phone"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidEmail(hut.email)) {
            message = "Invalid email"
            return res.status(422).json(message);
        }

        if (servicesUtility.isNotValidField(hut.description)) {
            message = "Invalid Description"
            return res.status(422).json(message);
        }

        try {
            await hutDB.addHut(hut);
            return res.status(201).end();
        }
        catch (err) {
            message = "Server Error"
            return res.status(503).json(message);
        }
    }


    async getAllHuts(req, res) {
        try {
            let huts = await hutDB.getHuts();
            return res.status(200).json(huts);
        }
        catch (err) {
            return res.status(500).end();
        }

    };

    async getHutById(req, res) {

        try {
            let hut = await hutDB.getHutById(req.params.hutId)
            if (hut === undefined) {
                return res.status(404).json({ error: `Hut not found` }); // not found
            }
            return res.status(200).json(hut);
        } catch (err) {
            return res.status(500).end();
        }
    };

}

module.exports.HutDescription = HutDescription;