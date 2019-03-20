var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('art', { page: 'Art', section: "Art" });
});

module.exports = router;