let fs = require('fs');
let path = require('path');

function getSpacing(width) {
    let height = 1;
    var works = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', 'art.json')));
    var placed = [];
    for(let i = 0; i < works.length; ++i) {
        let ratio = [0.75, 0.5, 0.25][Math.floor(Math.random() * 3)];
        works[i].width = Math.floor(works[i].width * ratio);
        works[i].height = Math.floor(works[i].height * ratio);
        works[i].x = Math.floor(Math.random() * width) - works[i].width;
        works[i].y = Math.floor(Math.random * height);
        let c = 0;
        while(collidesAny(works[i], placed)) {
            works[i].x = Math.floor(Math.random() * width) - works[i].width;
            works[i].y = Math.floor(Math.random * height);
            if(c > 10) {
                height += works[i].height;
                c = 0;
            }
        }
        placed.push(works[i]);
    }
    console.log(placed);
    return placed;
}

function collidesAny(thing, any) {
    for(let i = 0; i < any.length; ++i) {
        let xcol = thing.x <= any[i].x && (thing.x + thing.width) > any[i].x ||
            any[i].x < thing.x && (any[i].x + any[i].width) > thing.x;
        let ycol = thing.y <= any[i].y && (thing.y + thing.height) > any[i].y ||
            any[i].y < thing.y && (any[i].y + any[i].height) > thing.y;
        if(xcol && ycol) {
            return true;
        }
    }
    return false;
}

module.exports = getSpacing;