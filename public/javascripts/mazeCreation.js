var deff;

$.ready = () => {
    deff = $("#maze tr").length
    ends();
    setup();
}

function setup() {
    $(maze).css('user-drag', 'none'); 
    $(maze).css('user-select', 'none');
    $(clearbutt).click(clear);
    $(solvebutt).click(solve);
}

function ends() {
    setTile(0, 0, 'blue');
    setTile(deff - 1, deff - 1, 'green');
}


function toggle(e) {
    if(e.type == 'mousemove' && e.buttons == 1 || e.type == 'click') {
        if(e.shiftKey) {
            $(e.target).not('#end').css('background-color', '');
        } else {
            $(e.target).not('#end').css('background-color', 'black');
        }
    }
}

function setTile(x, y, color) {
    $(`#maze tr:nth-child(${y + 1}) td:nth-child(${x + 1})`).css('background-color', color);
}



function solve() {

    let data = [];

    for(let y = 0; y < deff; ++y) {
        for(let x = 0; x < deff; ++x) {
            data.push($(`#maze tr:nth-child(${y + 1}) td:nth-child(${x + 1})`).css('background-color') == 'rgb(0, 0, 0)' ? 1 : 0)
        }
    }

    console.log(data);

    $.post({
        url: "maze/solve",
        data: {data: JSON.stringify(data)},
        dataType: "json",
        success: (d) => { console.log(d); },
        error: (e) =>  { console.log(e); }
    });
    
 }

function clear() {
    $('#maze tr td').not('#end').css('background-color', '');
}