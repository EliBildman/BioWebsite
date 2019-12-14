
let numDes = 3;
let selected = 1;

$(document).ready(() => {
    initButtons();
});

function initButtons() {

    for(let i = 1; i <= numDes; ++i) {
        $(`#${i}`).on('click', (a) => {
            let nCl = $('.design').not(a.currentTarget);
            for(let i = 0; i < nCl.length; ++i) {
                nCl[i].style.border = "3px solid black";
            }
            a.currentTarget.style.border = "3px solid red";
            selected = i
        });
    }
    
}

function loadingAni() {
    let dots = 0;
    let p = $('#loading');
    let loop = setInterval(() => {
       p.html('Loading');
        for(let i = 0; i < dots % 4; ++i) {
            p.append('.');
        }
        ++dots;
    }, 500);
    return loop;
}

function generate() {
    let scale = parseInt($("#lines").find("option:selected").val());
    let width = 1920 / scale;
    let height = 1080 / scale;
    let id = (new Date()).getTime();
    let ani = loadingAni();

    $.ajax(`/projects/wallpapergenerator/generate?design=${selected}&width=${width}&height=${height}&id=${id}&security=noSmap`, {
        success: () => {
            $('#image').html(`<img src= /images/wallpapers/${id}.png style='width: 100%; height: 100%;'>`);
            id += 1;
            clearInterval(ani);
            $('#loading').html('');
        },
        error: () => {
            throw "broke";
        }
    });
}