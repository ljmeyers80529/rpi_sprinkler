// checks if a datetim is already a number.
// if already a number is returned unmodified, otherwise it is converted.
const timeToInteger = (date) => {
    let timeVal = date; // if already a number.
    if (typeof date === 'object') {
        timeVal = date.getTime();
    }
    return timeVal;
}

module.exports = { timeToInteger };