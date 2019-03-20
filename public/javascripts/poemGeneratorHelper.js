var counter = 0

function randomCssCol(low, high) {
    var rgb = "rgb("
    for(var i = 0; i < 3; ++i) {
        rgb += Math.floor(low + Math.random() * (high - low)) + (i < 2 ? ", " : "");
    }
    return rgb + ")";
}

function getPoem() {
    var lines = $("#lines").find("option:selected").val();
    var min = $("#min").find("option:selected").val();
    var max = $("#max").find("option:selected").val();
    if (parseInt(max) < parseInt(min)) {
        max = min;
        $("#max").val(min);
    }
    $.ajax(`/projects/newPoem?lines=${lines}&minLine=${min}&maxLine=${max}&security=bigYam`, {
        success: (data) => {

            let poem = data['poem'].reduce((acc, curr) => {
                acc += curr + "<br />";
                return acc;
            }, "");

            counter += 1;
            $("#poems").prepend("<div class=\"col-12 col-sm-6 col-md-4 col-lg-3 md mb-3\"><div class=\"card p-2 text-dark border-secondary\" style=\"background-color: " + randomCssCol(200, 255) + "; overflow: scroll;\"><h3 class=\"card-title\">Poem #" + counter + "</h1><p class=>" + poem + "</p></div></div>");
        },
        error: (data) => {
            console.log(data);
        }
    });
    
}


$(document).ready(() => {
    getPoem();
});