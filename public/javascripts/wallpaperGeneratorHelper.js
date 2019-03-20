// $('#1').on('click', () => {
//     console.log('hello');
// });


let numDes = 3;
let selected = 1;
let id = 0;

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

function generate() {
    let width = 500;
    let height = 500;
    $.ajax(`/projects/wallpapergenerator/generate?design=${selected}&width=${width}&height=${height}&id=${id}$security=noSmap`, {
        success: () => {
            $('#display').html(`<img src=/public/images/wallpapers/${id}.png`);
        },
        error: () => {
            throw "broke";
        }
    });
}