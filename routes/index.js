var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
    let db = req.app.locals.db;
    res.render('index', {
        title: 'RIT Cats - Feeder Check-In.', feeders: db.get('feeders')
    });
});


module.exports = router;
