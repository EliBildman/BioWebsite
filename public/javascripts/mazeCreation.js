
var deff;
var solved = false;

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
    setTile(0, 0, 'red');
    setTile(deff - 1, deff - 1, 'blue');
}


function toggle(e) {
    if((e.type == 'mousemove' && e.buttons == 1 || e.type == 'click')) {
        if(solved) {
            clearSolve();
        }
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

    // console.log(data);

    $.post({
        url: "maze/solve",
        data: {data: JSON.stringify(data)},
        dataType: "json",
        success: (d) => display(d),
        error: console.log,
    });
    
 }

function display(d) {
    // console.log(d);
    clearSolve();
    if(d.length > 0) {
        solved = true;
        $('#outmessage').text('');
        let i = 0;
        let ani;
        let clear = () => { clearInterval(ani); };
        ani = setInterval(() => {
            setTile(d[i][0], d[i][1], `rgb(${255 * (1 - i / d.length)}, 0, ${255 * i / d.length})`);
            i++;
            if(i >= d.length) clear();
        }, 8);
    } else {
        // let xd = new Audio('/sounds/amberalert.mp3');
        // xd.play();
        // alert("no solution you fuck drawa m aze that works >:(");
        $('#outmessage').text('No Solution :(');
    }
}

function clear() {
    $('#outmessage').text('');
    solved = false;
    $('#maze tr td').not('#end').css('background-color', '');
}

function clearSolve() {
    solved = false;
    for(let x = 0; x < deff; x++) {
        for(let y = 0; y < deff; y++) {
            let tile = $(`#maze tr:nth-child(${y + 1}) td:nth-child(${x + 1})`);
            if(tile.css('background-color') != 'rgb(0, 0, 0)') setTile(x, y, '');
        }
    }
    ends();
}