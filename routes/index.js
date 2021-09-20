var express = require('express');
var router = express.Router();

const JSONdb = require('simple-json-db');
const db = new JSONdb('database.json');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'RIT Cats - Feeder Check-In.', feeders: db.get('feeders')
    });
});


module.exports = router;
