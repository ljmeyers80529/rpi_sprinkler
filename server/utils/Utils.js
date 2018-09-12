const moment = require('moment');

// checks if a datetim is already a number.
// if already a number is returned unmodified, otherwise it is converted.
const timeToInteger = (date) => {
    let timeVal = date; // if already a number.
    if (typeof date === 'object') {
        timeVal = date.getTime();
    }
    return timeVal;
}

// cDate = current date / time value,
// days = number of days to add,
// hours = number of hours to add,
// minutes = number of minutes to add,
// returns new date and time.
const dateTimeOffset = (cDate, days, hours, minutes) => {
    return new Date(moment(cDate).add(days, 'days').add(hours, 'hours').add(minutes, 'minutes'));
}

module.exports = { timeToInteger, dateTimeOffset };