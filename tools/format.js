function toTuple(s) {
    let com = s.indexOf(',');
    return [parseInt(s.substring(0, com)), parseInt(s.substring(com + 1))];
}

module.exports.formatNLCN = function(s) {
    let a = [];
    let last = -1;
    for(let i = 0; i < s.length; ++i) {
        if(s.charAt(i) == '\n') {
            a.push(toTuple(s.substring(last + 1, i)));
            last = i;
        }
    }
    return a;
}

