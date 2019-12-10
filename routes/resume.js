var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('resume/index', { page: 'Resume', section: "Resume" });
});

module.exports = router;