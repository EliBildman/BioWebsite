let mouseDown;
let ctx;
let height;
let width;

$.ready = () => {

    let can = $('#can')[0];
    ctx = can.getContext('2d');
    height = can.height;
    width = can.width;


    drawEnds();
    
    setMouseLogic();
    setContextProps();
    
    $('#button')[0].onclick = () => {
        
        let d = ctx.getImageData(0, 0, width, height).data;

        $.ajax({
            url: "maze/solve",

            data: {data: JSON.stringify(Object.values(d))},
            dataType: "json",
            success: (d) => { console.log(d); },
            error: (e) =>  { console.log(e); }
        });
    }
}

function drawEnds() {
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(20, 20, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#00FF00";
    ctx.arc(height - 20, width - 20, 15, 0, 2 * Math.PI);
    ctx.fill();
}

function setContextProps() {
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round'
}

function setMouseLogic() {
    can.onmouseout = () => {mouseDown = false};
    can.onmousedown = (e) => {mouseDown = true; drawEvent(e, true)};
    can.onmouseup = () => {mouseDown = false;};
    can.onmousemove = (e) => {drawEvent(e, false)};
}

function drawEvent(event, newLine) {
    if(mouseDown) {
        if(newLine) {
            ctx.beginPath();
        }
        ctx.lineTo(event.layerX, event.layerY);
        ctx.stroke();
    }
}

