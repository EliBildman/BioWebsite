var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('about/index', { page: 'Eli Bildman', section: "About" });
});

module.exports = router;