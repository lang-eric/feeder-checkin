var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let db = req.app.locals.db;
    res.render('index', {
        title: 'RIT Cats - Feeder Check-In.',
        feeders: db.get('feeders')
    });
});

/* POST checkin page. below handles what happens when we receive a post request from the browser.
 */
router.post('/', function(req, res, next) {
    let checkInMessage = req.body.message
    console.log(`received message: ${checkInMessage} from client.`);

    let db = req.app.locals.db;
    let discordStuff = req.app.locals.discordStuff;

    discordStuff.sendMsgToCheckinChannel(checkInMessage).then(function() {
        res.status(202).json({ message: checkInMessage });
    });
});


module.exports = router;