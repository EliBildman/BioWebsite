
$('document').ready(() => {
    $.getJSON('/data/art.json', (works) => {
        addSpacing($('#works').width(), works);
        placeTiles(works);
        setLinks(works);
    });
});

function placeTiles(works) {
    let i = 0;
    works.forEach((work) => {
        let name = work.type.substring(work.type.indexOf('-') + 1, work.type.length) == 'collection' ? "Col. " + work.name : work.name;
        $('#works').append(`<div id=${work.id} style="position:absolute; left:${work.x}px; top:${work.y}px;"><img src="${work.thumbnail}" style="width:${work.width}px;"></div>`);
        $(`#${work.id}`).append(`<div class="shade" style="opacity: 0; background: black; position: absolute; width: 100%; height: 100%; top: 0px;"><h1 style="opacity: 1; color: white;">${name}</h1></div>`);
        $(`#${work.id} > .shade`).mouseover((d) => {
            console.log('hmm');
            $(`#${work.id} > .shade`).css("opacity", 0.5);
        });
        $(`#${work.id} > .shade`).mouseout((d) => {
            $(`#${work.id} > .shade`).css("opacity", 0);
        });
        i++;
    });
}

function addSpacing(width, works) {
    let height = 1;
    var placed = [];
    for(let i = 0; i < works.length; ++i) {
        let w = randint(Math.floor(width / 4), Math.floor(width / 3));
        works[i].height = Math.floor(works[i].height * w / works[i].width);
        works[i].width = w;
        works[i].x = randint(0, width - works[i].width);
        let bot = 0;
        works[i].y = randint(bot, height);
        let c = 0;
        while(collidesAny(works[i], placed)) {
            works[i].x = randint(0, width - works[i].width);
            works[i].y = randint(0, height);
            if(c > 10) {
                bot = height;
                height += works[i].height + 20;
                c = 0;
            }
            c++;
            console.log("re");
        }
        placed.push(works[i]);
    }
}

function collidesAny(thing, any) {
    for(let i = 0; i < any.length; ++i) {
        if(collides(thing, any[i])) {
            return true;
        }
    }
    return false;
}

function collides(a, b) {
    return (a.x >= b.x && (a.x < b.x + b.width) || b.x >= a.x && (b.x < a.x + a.width)) &&
    (a.y >= b.y && (a.y < b.y + b.height) || b.y >= a.y && (b.y < a.y + a.height));
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function setLinks(works) {
    for(let i = 0; i < works.length; ++i) {
        $('#' + works[i].id).click(() => {
            window.location.href = `display?id=${works[i].id}`;
        });
    }
}
