let swipes = [];
let spent = [];
let deposited = [];
let all = [];

let charts = {};

am4core.ready(() => {am4core.useTheme(am4themes_animated);});

let start = new Date("September 3, 2019 00:00:00");
let end = new Date();


function display(data) {
    clearCharts();
    $('#display').css('display', 'block');
    parseData(data);
    $('#entry_oldest').text(start.toDateString());
    $('#swipes_total').text(swipes.length);
    $('#spent_total').text(formatMoney(totalSpent(spent)));
    charts.swipes_freq_pie = pieChart('swipes_freq_pie', {fields: {value: "frequency", category: "location"}, data: freq(swipes, "location")}, 400, false);
    charts.spent_total_pie = pieChart('spent_total_pie', {fields: {value: "dollars", category: "location"}, data: moneyDist(spent, "location")}, 400, true);
    $('#days').text(Math.floor(daysPassed()));
    $('#overall_average').text(roundTo(all.length / daysPassed(), 2));
    $('#swipes_average').text(averageOverDays(swipes.length));
    $('#spent_average').text(formatMoney(averageOverDays(totalSpent())));
    $('#swipes_over_time_selector').change(updateSwipesBar);
    charts.swipes_over_time = clusterBar('swipes_over_time_bar', swipesOverDayConfig(), 600);
    // multiLine('balance_line1', balancesConfig(["UMass Dining Dollars"]), 600);
    $('#uses_over_time_selector').change(updateUsesLines);
    charts.COL_uses_lines = accountLines('balance_line', 400);
    balanceCols("remaining_balances");
}

function parseData(data) {
    spent = [];
    deposited = [];
    swipes = [];
    all = [];
    data.forEach(e => {
        //not a credit card account :/
        if(e.remaining != '') {
            e.dateTime = dateOf(e);
            if(e.dateTime >= start) {
                if(e.spent.includes('$')) {
                    if(e.spent.includes('+')) {
                        e.spent = Number.parseFloat(e.spent.substring(3));
                        deposited.push(e);
                    } else {
                        e.spent = Number.parseFloat(e.spent.substring(3))
                        spent.push(e);
                    }
                } else {
                    e.spent = parseInt(e.spent);
                    swipes.push(e);
                }
                all.push(e);
            }
        }
    });
}

function clusterBar(div, config, height) {

    $('#' + div).css('width', '100%');
    $('#' + div).css('height', height + 'px');

    var chart = am4core.create(div, am4charts.XYChart);

    chart.data = config.data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields = config.fields;
    categoryAxis.renderer.grid.template.location = 0;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(name) {

        //set up series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = name;
        series.dataFields.categoryX = config.fields.category;
        series.sequencedInterpolation = true;
        series.yAxis = valueAxis;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        return series;
    }

    config.types.forEach(e => {
        createSeries(e);
    });

    chart.legend = new am4charts.Legend();

    return chart;

}

function multiLine(div, config, height) {
    $('#' + div).css('width', '100%');
    $('#' + div).css('height', height + 'px');

    var chart = am4core.create(div, am4charts.XYChart);

    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    // Add data
    chart.data = config.data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 5;
    // valueAxis.renderer.line.stroke = series.stroke;
    // valueAxis.renderer.labels.template.fill = series.stroke;
    // valueAxis.renderer.opposite = opposite;
    valueAxis.renderer.grid.template.disabled = true;

    valueAxis.min = 0;

    // Create series
    function createAxisAndSeries(name, color, straight) {
        
        
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = name;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = (straight ? 1 : 0.8);

        
        // var interfaceColors = new am4core.InterfaceColorSet();

        // var bullet = series.bullets.push(new am4charts.CircleBullet());
        // bullet.circle.stroke = interfaceColors.getFor("background");
        // bullet.circle.strokeWidth = 2;
        
        series.stroke = am4core.color(color);

    }

    config.lines.forEach(e => {
        createAxisAndSeries(e.name, e.color, e.straight);
    });


    // Add legend
    // chart.legend = new am4charts.Legend();

    // chart.scrollbarX = new am4core.Scrollbar();


    // Add cursor
    //chart.cursor = new am4charts.XYCursor();

    return chart;

}

function pieChart(div, config, height, dollars) {
    $('#' + div).css('width', '100%');
    $('#' + div).css('height', height + 'px');
    let chart = am4core.createFromConfig({
        "series": [{
            "type": "PieSeries",
            "dataFields": config.fields,
            "labels": {
                "disabled": true
            }
        }],
        "data": config.data
    }, div, am4charts.PieChart);
    if(dollars) {
        chart.numberFormatter.numberFormat = "$#,###.00";
    }
    return chart;
}

function balanceCols(div) {
    let accs = accountBalances();
    let i = 0;
    $(`#${div}`).empty();
    accs.forEach((acc) => {
        $(`#${div}`).append(`<td class="${i != accs.length - 1 ? "border-right" : ""}" colspan="${12 / accs.length}"><h5>${acc.name} Remaining</h5><h3 class="text-primary">${acc.balance}</div></td>`);
        i++;
    });
}

function swipesOverDayConfig() {
    let config = {fields: {category: "time"}, data: [], types: []};
    for(let i = 0; i < 24; i++) {
        config.data.push({time: notMil(i)});
    }
    swipes.forEach(e => {  
        if(!config.types.includes(e.location)) config.types.push(e.location);

        let series = config.data[e.dateTime.getHours()];
        if(e.location in series) series[e.location] += 1;
        else series[e.location] = 1;

    });
    return config;
}

function swipesOverWeekConfig() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let config = {fields: {category: "time"}, data: [], types: []};
    days.forEach(e => {
        config.data.push({time: e});
    });
    swipes.forEach(e => {
        if(!config.types.includes(e.location)) config.types.push(e.location);
        let series = config.data[e.dateTime.getDay()];
        if(e.location in series) series[e.location] += 1;
        else series[e.location] = 1;
    });
    return config;
}

function balancesConfig(accounts, colorBase) {
    let config = {lines: [], data: []}

    let i = 0;
    accounts.forEach(e => {
        config.lines.push({
            name: e,
            color: toColorHex((colorBase + i * 1000) % Math.pow(256, 3)),
            straight: true
        });
        i++;
    });

    function makePoint(acc, time, rem) {
        let point = {};
        point["date"] = time;
        point[acc] = rem;
        return point;
    }

    all.slice().reverse().forEach(e => {
        if(accounts.includes(e.account))
            config.data.push(makePoint(e.account, e.dateTime, e.remaining));
    });

    accounts.forEach(acc => {
        let last;
        let first = true;
        for(let i = 0; i < all.length; i++) {
            // console.log(i);
            if(all[i].account == acc) {
                if(first) {
                    first = false;
                    config.data.push(makePoint(acc, end, all[i].remaining));
                }
                last = all[i];
            } 
        }
        if(last) config.data.unshift(makePoint(acc, start, last.remaining));
    });
    
    return config;
}

function usesPerDayConfig(accounts, colorBase, numGroup) {

    let config = {lines: [], data: []};

    let i = 0;
    accounts.forEach(e => {
        config.lines.push({
            name: e,
            color: toColorHex((colorBase + i * 1000) % Math.pow(256, 3)),
            straight: true
        });
        i++;
    });

    let d = new Date(start);
    let itt = 0;
    while(d < end) {
        if(itt == 0) {
            config.data.push({
                date: new Date(d)
            });
        }
        accounts.forEach((account) => {
            let num = all.reduce((acc, curr) => {
                if(account == curr.account && sameDay(d, curr.dateTime)) return acc + 1;
                return acc;
            }, 0);
            if(account in config.data[config.data.length - 1]) {
                config.data[config.data.length - 1][account] += num;
            } else {
                config.data[config.data.length - 1][account] = num;
            }
        });
        d.setDate(d.getDate() + 1);
        itt++;
        if(itt == numGroup || d >= end) {
            accounts.forEach((account) => {
                config.data[config.data.length - 1][account] /= itt;
            });
            let copy = Object.assign({}, config.data[config.data.length - 1]);
            copy.date = new Date(copy.date);
            copy.date.setDate(copy.date.getDate() + numGroup);
            config.data.push(copy);
            itt = 0;
        }
    }

    return config;

}

function updateSwipesBar() {
    let config;
    if($('#swipes_over_time_selector').val() == 'Time of Day') {
        config = swipesOverDayConfig();
    } else {
        config = swipesOverWeekConfig();
    }
    charts.swipes_over_time.data = config.data;
}

function updateUsesLines() {
    let config;
    Object.keys(charts.COL_uses_lines).forEach((k) => {
        if($('#uses_over_time_selector').val() == 'Balances') {
            charts.COL_uses_lines[k].data = balancesConfig([k], Math.random() * Math.pow(256, 3) / 2).data;
        } else if ($('#uses_over_time_selector').val() == 'Average Uses per Day') {
            charts.COL_uses_lines[k].data = usesPerDayConfig([k], Math.random() * Math.pow(256, 3) / 2, 7).data;
        }
        
    });
}

function clearCharts() {
    function disposeObj(obj) {
        Object.keys(obj).forEach((k) => {
            if(k.substring(0, 3) == 'COL') {
                disposeObj(obj[k]);
            } else {
                obj[k].dispose();
            }
        });
    }
    disposeObj(charts);
    charts = {};
}

function freq(d, field) {
    let freqs = [];
    function get(name) {
        for(let i = 0; i < freqs.length; i++) {
            if(freqs[i][field] == name) return freqs[i];
        }
        freqs.push({
            'frequency': 0
        });
        freqs[freqs.length - 1][field] = name;
        return freqs[freqs.length - 1];
    }
    d.forEach((e) => {
        get(e[field])['frequency'] += 1;
    });
    return freqs;
}

function moneyDist(d, field) {
    let dist = [];
    function get(name) {
        for(let i = 0; i < dist.length; i++) {
            if(dist[i][field] == name) return dist[i];
        }
        dist.push({
            'dollars': 0
        });
        dist[dist.length - 1][field] = name;
        return dist[dist.length - 1];
    }
    d.forEach((e) => {
        get(e[field])['dollars'] += e.spent;
    });
    dist.forEach
    return dist;
}

function toMil(time) {
    let col = time.indexOf(':');
    let hours;
    if(time.substring(0, col) == '12') {
        hours = (time.charAt(time.length - 2) == 'P' ? 12 : 0);
    } else {
        hours = (parseInt(time.substring(0, col)) + (time.charAt(time.length - 2) == 'P' ? 12 : 0));
    }
    let mins = parseInt(time.substring(col + 1, time.length - 2));
    return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:00`;
}

function dateOf(event) {
    return new Date(`${event.date} ${toMil(event.time)}`);
}

function oldest(data) {
    return data.reduce((acc, curr) => {
        let d = dateOf(curr);
        if(d < acc) return d;
        return acc;
    }, dateOf(data[0]));
}

function totalSpent() {
    let total = 0;
    spent.forEach(e => {
        total += e.spent;
    });
    return total;
}

function formatMoney(num) {
    let dol = Math.floor(num);
    let cent = Math.floor((num - dol) * 100);
    return `$${dol}.${cent < 10 ? '0' : ''}${cent}`;
}

function notMil(mil) {
    if(mil == 0) return "12 AM";
    if(mil == 12) return "12 PM"
    if(mil < 12) {
        return mil + " AM"
    } else {
        return (mil - 12) + " PM";
    }
}

function daysPassed() {
    return (end - start) / (24 * 60 * 60 * 1000);
}

function averageOverDays(total) {
    return roundTo(total / daysPassed(), 2);
}

function roundTo(num, to) {
    return Math.round(num * Math.pow(10, to)) / Math.pow(10, to);
}

function toColorHex(num) {
    let hex = num.toString(16);
    while(hex.length < 6) {
        hex = '0' + hex;
    }
    return '#' + hex;
}

function sameDay(a, b) {
    return a.getFullYear() == b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate();
}

function allAccounts() {
    let accs = [];
    all.forEach(e => {
        if(!accs.includes(e.account)) accs.push(e.account);
    })
    return accs;
}

function accountLines(divBase, height) {

    let configs = [];

    allAccounts().forEach(acc => {
        configs.push(usesPerDayConfig([acc], Math.floor(Math.random() * Math.pow(256, 3) / 3), 4));
    });

    configs.sort((a, b) => b.data.length - a.data.length);

    let col = {};

    for(let i = 0; i < configs.length && i < 4; i++) {
        col[configs[i].lines[0].name] = multiLine(divBase + i, configs[i], configs.length > 2 ? height / 2 : height);
        $(`#${divBase}_lable${i}`).text(configs[i].lines[0].name);
        $(`#${divBase}_lable${i}`).css("color", configs[i].lines[0].color);
    }

    return col;
}

function accountBalances() {
    accs = [];
    all.forEach((e) => {
        if(accs.length < 4 && !accs.some((acc) => acc.name == e.account)) {
            accs.push({name: e.account, balance: e.remaining});
        }
    });
    return accs;
}