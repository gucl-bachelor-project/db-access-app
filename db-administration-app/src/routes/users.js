const express = require("express");
const db = require('../models');
const validateReq = require("../middleware/validate");
const {validateCreation: validateUserCreation} = require('../models/user');

const router = express.Router();

router.get("/", async (_req, res) => {
    const users = await db["User"].findAll();

    res.type('application/json');
    return res.status(200).send(users);
});

router.post('/', [validateReq(validateUserCreation)], async (req, res) => {
    const createdUser = await db["User"].create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
    });

    return res.status(201).send({id: createdUser.id});
});

module.exports = router;
