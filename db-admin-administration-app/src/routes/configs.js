const express = require("express");
const db = require('../models');
const validateReq = require("../middleware/validate");
const {validateCreation: validateConfigCreation} = require('../models/config');

const router = express.Router();

router.get("/", async (_req, res) => {
    const configs = await db["Config"].findAll();

    res.type('application/json');
    return res.status(200).send(configs);
});

router.post('/', [validateReq(validateConfigCreation)], async (req, res) => {
    const createdConfig = await db["Config"].create({
        name: req.body.name,
        enabled: req.body.enabled
    });

    return res.status(201).send({id: createdConfig.id});
});

module.exports = router;
