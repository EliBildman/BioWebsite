
let user = undefined;
let shifts = undefined;
let shiftDates = [];

$(document).ready(() => {
    $('#nameinput').on('keyup', () => {
        listShifts($('#nameinput').val());
    });
    $('#submitbutton').click(uploadToCalendar);
});

function initgapi() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyCbAQtrrFdoZs-yfxiPSbR4JHBu9xLMJBA',
        clientId: '949471561840-rr8sml48042ks3f4258vn6gg0fs76iqs.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar'
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(signInUpdate);
        signInUpdate(gapi.auth2.getAuthInstance().isSignedIn)
        $('#googlebutton').click(gapi.auth2.getAuthInstance().signIn);
    }, (err) => { console.log(err) });
}

function signInUpdate(b) {
    if(b) {
        user = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        $('#logstatus').text("Logged In as " + user.getName());
        $('#nameinput').val(user.getGivenName());
        listShifts(user.getGivenName());
    } else {
        $('#logstatus').text("Not Logged In");
    }
}

function listShifts(name) {
    name = name.toLowerCase();
    $('#shifts tbody').empty();
    shiftDates = [];
    list = () => {
        if(shifts[name]) {
            shifts[name].forEach((shift) => {
                if(shift != 'Unknown') {
                    let s = new Date(shift.start.year, shift.start.month - 1, shift.start.day, shift.start.hour, shift.start.minute);
                    let e = new Date(shift.end.year, shift.end.month - 1, shift.end.day, shift.end.hour, shift.end.minute);
                    shiftDates.push({start: s, end: e});
                    $('#shifts tbody').append(`<tr><td>${s.toLocaleDateString('en-US', {month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})} - ${e.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})} </td></tr>`)
                } else {
                    $('#shifts tbody').append('<tr><td>Unknown Shift</td></tr>');
                }
            });
        }
    }
    if(shifts) {
        list();
    } else {
        $.ajax({
            url: '/data/schedulegrabber/shifts.json'
        }).then((data) => {
            shifts = data;
            list();
        });
    }
}

function uploadToCalendar() {
    events = [];
    shiftDates.forEach((s) => {
        let event = {
            'summary': "D's",
            'location': '313 Massachusetts Avenue, Cambridge, MA 02139',
            'start': {
            'dateTime': s.start.toISOString(),
            'timeZone': 'America/New_York'
            },
            'end': {
              'dateTime': s.end.toISOString(),
              'timeZone': 'America/New_York'
            }
        };
        gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        }).execute();
    });
}