var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { page: 'Eli Bildman', section: "Greeting" });
});

module.exports = router;
