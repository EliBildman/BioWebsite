var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
    res.render('art', { page: 'Art', section: "Art"});
});

router.get('/display', (req, res, next) => {
    let work = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'art.json'))).find((w) => {
        return w.id == req.query['id'];
    });
    console.log(work)
    if(work.type == 'photo') {
        res.render('photodisplay', {page: (work.name ? work.name : 'untitled'), section: 'Art', pics: [work.thumbnail]});
    } else if (work.type == 'photo-collection') {
        fs.readdir(path.join(__dirname, '..', 'public', work.folder), (err, items) => {
            res.render('photodisplay', {page: (work.name ? work.name : 'untitled'), section: 'Art', pics: items.map((name) => {return path.join(work.folder, name)})});
        });
    }

});

module.exports = router;