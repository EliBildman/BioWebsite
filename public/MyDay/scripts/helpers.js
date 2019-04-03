function HSVtoHexRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    let rgb = [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
    let hex = "";
    for(let i = 0; i < rgb.length; i++) {
      hex += rgb[i].toString(16).length == 2 ? rgb[i].toString(16).toUpperCase() : "0" + rgb[i].toString(16).toUpperCase();
    }
    return hex;
}

function randomRGB() {
  let col = (Math.floor(Math.random() * 8777216) + 8000000).toString(16).toUpperCase();
  let oglen = col.length;
  for(let j = 0; j < 6 - oglen; j++) col = "0" + col;
  return col;
}

//hex is string i.e. F1A732
function hexToList(hex) {
  rgb = [];
  for(let i = 0; i < 6; i += 2) {
    rgb.push(parseInt(hex[i], 16) * 16 + parseInt(hex[i + 1], 16));
  }
  return rgb;
}

function avgHex(hexa, hexb) {
  let a = hexToList(hexa);
  let b = hexToList(hexb);
  let avg = [];
  for(let i = 0; i < 3; i++) {
    avg.push(Math.floor((a[i] + b[i]) / 2));
  }
  return rgbToHex(avg);
}

function rgbToHex(rgb) {
  let hex = "";
  for(let i = 0; i < rgb.length; i++) {
    let col = rgb[i].toString(16).toUpperCase();
    hex += col.length < 2 ? "0" + col : col;
  }
  return hex;
}

function hexToRGBATag(hexColor, a) {
  let color = hexToList(hexColor);
  return "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + a + ")";
}
