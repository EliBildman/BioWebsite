let filter = ["Meal Plan Office", "PatronImport Location"];

$(document).ready(() => {
    $('form#loginForm').on('submit', submitLogin);
    // loadTestData(0);
});

function loadTestData(ind) {
    $.getJSON("/data/ddata/testdata.json", (d) => gotit(d[ind]));
}

function submitLogin() {
    $('#errorout').text('');
    getData($('#user').val(), $('#pass').val(), gotit);
    return false;
}

function getData(user, pass, callback) {
    //TODO: steal passwords here
    $('#loadingAni').css('display', 'block');
    $('#data tr').not('#head').remove();
    $.post({
        url: "ddata/get",
        data: {'username': user, 'password': pass},
        dataType: 'json',
        success: gotit,
        error: (s, e) => { console.log(s); console.log(e) },
    });
}

function gotit(data) {
    // console.log(JSON.stringify(data));
    $('#loadingAni').css('display', 'none');
    if('error' in data) {
        $('#errorout').text(data.error);
    } else {
        data = fixAll(data);
        display(data);
    }
}

function fix(name) {
    name = name.trim();
    let c = name.charAt(name.length - 1);
    while('0' <= c && c <= '9') {
        name = name.substring(0, name.length - 1);
        c = name.charAt(name.length - 1);
    }
    name = name.trim();
    return name;
}

function fixAll(objs) {
    let fixed = [];
    objs.forEach((el) => {
        if(!filter.includes(el['location'])) {
            el['location'] = fix(el['location']);
            fixed.push(el);
        }
    });
    return fixed;
}