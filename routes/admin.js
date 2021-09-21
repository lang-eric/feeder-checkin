var express = require('express');
var router = express.Router();

// TODO DRY.

/* GET admin page. */
router.get('/admin', function (req, res, next) {
    let db = req.app.locals.db;
    res.render('admin', {
        title: 'RIT Cats - Feeder Check-In.', feeders: db.get('feeders')
    });
});

/* POST admin page. 
    Currently delete button presss is sent as a POST to the /admin endpoint...
*/

router.post('/admin', function (req, res, next) {
    let feederToDelete = req.body.feederToDelete
    console.log(`deleting feeder: ${feederToDelete} from json database.`);
    let db = req.app.locals.db;

    let feedersArray = db.get("feeders");
    let findFeederToDelete = (feeder) => feeder === feederToDelete;

    const feederToDeleteIndex = feedersArray.findIndex(findFeederToDelete);
    if (feederToDeleteIndex === -1) {
        res.status(404).json({ message: 'Feeder not found :(.' });
    } else {
        feedersArray.splice(feederToDeleteIndex, 1);

        db.set('feeders', feedersArray);
        res.status(202).json({ message: 'Feeder removed from JSON database..' });
    }

});


module.exports = router;
