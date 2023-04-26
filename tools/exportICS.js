import {VCALENDAR, VEVENT} from 'ics-js';

const cal = new VCALENDAR();
cal.addProp('VERSION', 2);
cal.addProp('PRODID', 'DCA');

for (const event of allEvents) {
    let eventYear = new Date(event.date[0]).getFullYear();
    if (eventYear !== selectedYear) continue;
    let vevent = new VEVENT();
    vevent.addProp('UID', `${Math.random()}@dca`);
    vevent.addProp('DTSTAMP', new Date());
    vevent.addProp('DTSTART', new Date(event.date[0]));
    vevent.addProp('DTEND', new Date(event.date[1] ?? event.date[0]));
    vevent.addProp('LOCATION', event.location || 'unspecified');
    vevent.addProp('SUMMARY', event.name);
    vevent.addProp('URL', event.hyperlink || 'unspecified');
    cal.addComponent(vevent);
}

let blob = cal.toBlob();
let href = createObjectURL(blob);
let file = `developer-conference-${selectedYear}.ics`;
