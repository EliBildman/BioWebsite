var express = require('express');
var jsonfile = require('jsonfile');
var path = require('path');
var router = express.Router();
var spawn = require('child_process').spawn;

router.get('/', function(req, res, next) {
    jsonfile.readFile(path.join(__dirname, '..', 'public', 'data', 'projects.json'), (err, obj) => {
        if(err) throw err;
        res.render('projects', {page: "Projects", section: "Projects", projects: obj});
    });
});

router.get('/poemgenerator', function(req, res, next) {
    jsonfile.readFile(path.join(__dirname, '..', 'public', 'data', 'projects.json'), (err, obj) => {
        if(err) throw err;
        res.render('poem_generator', {page: "Poem Generator", section: "Projects", desc_link: "/projects/poemgenerator/description"});
    });
});

router.get('/newPoem', (req, res, next) => {
    if(req.query['security'] === 'bigYam') {
        var proc = spawn('python', [path.join(__dirname, '..', 'Projects', 'PoemGenerator', 'poemCreator.py'), req.query['lines'], req.query['minLine'], req.query['maxLine']]);
        proc.stdout.on('data', (data) => {

            let poem = data.toString();
            if(poem.length > 1) {
                poem = poem.split('\n').slice(0, poem.length - 1);
            } else {
                poem = [poem];
            }
            res.writeHead(200, { "Content-Type": "aplication/json" });
            res.end(JSON.stringify({'poem': poem }));
        });
    } else {
        res.redirect('/projects');
    }
});

router.get('/poemgenerator/description', (req, res, next) => {
    res.render('poem_generator_desc', {page: "Poem Generator", section: "Projects", demo_link: "/projects/poemgenerator"});
});

router.get('/wallpapergenerator', (req, res, next) => {
    res.render('wallpaper_generator', {page: "Wallpaper Generator", section: "Projects", desc_link: "/projects/wallpapergenerator/description"});
});

router.get('/wallpapergenerator/description', (req, res, next) => {
    res.render('wallpaper_generator_desc', {page: "Wallpaper Generator", section: "Projects", demo_link: "/projects/wallpapergenerator"});
});


router.get('/wallpapergenerator/generate', (req, res, next) => {
    //console.log(req.query('width'));
    if(req.query['security'] === 'noSmap') {
        res.send("Generating");
        var proc = spawn('python', [path.join(__dirname, '..', 'Projects', 'WallpaperGenerator', 'runner.py'), req.query['design'], req.query['width'], req.query['height'], path.join(__dirname, '..', 'public', 'images', 'wallpapers', req.query['id'] + '.png')]);
        //console.log(proc);
        proc.stdout.on('data', (data) => {

            res.end("Generated");
            
        });
    } else {
        res.redirect('/projects');
    }
});

module.exports = router;