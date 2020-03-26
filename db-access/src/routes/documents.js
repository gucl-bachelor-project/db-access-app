const express = require("express");
const db = require('../models');
const validateReq = require("../middleware/validate");
const { validateCreation: validateDocumentCreation } = require('../models/document');

const router = express.Router();

router.get("/", async (_req, res) => {
    const documents = await db["Document"].findAll();

    res.type('application/json');
    return res.status(200).send(documents);
});

router.post('/', [validateReq(validateDocumentCreation)], async (req, res) => {
    const author = await db["User"].findByPk(req.body.author_user_id);
    if (!author)
        return res.status(400).send(`User with provided id (${req.body.author_user_id}) does not exist.`);

    const createdDocument = await db["Document"].create({
        title: req.body.title,
        content: req.body.content,
        pub_date: req.body.pub_date,
        author_user_id: author.id
    });

    return res.status(201).send({ id: createdDocument.id });
});

module.exports = router;
