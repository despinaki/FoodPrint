const express = require('express');
const db = require('../db/config');
const router = express.Router();

const { } = require('../db/queries');

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
});

module.exports = router;