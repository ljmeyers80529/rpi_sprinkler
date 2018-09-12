const utils = require('../utils/Utils');
const expect = require('expect');
const moment = require('moment');

describe('Utilities...', () => {

    const offDays = 7;
    const offHours = 11;
    const offMinutes = 49;
    const tDate = new Date();
    const fDate = new Date(moment(tDate).add(offDays, 'days').add(offHours, 'hours').add(offMinutes, 'minutes'));

    it('should convert datetime to an integer value...', () => {
        const conv = utils.timeToInteger(tDate);
        expect(typeof conv).toBe('number');
        expect(conv).toEqual(tDate.getTime());
    })

    it(`should be ${moment(fDate).local()}...`, () => {
        const offset = utils.dateTimeOffset(tDate, offDays, offHours, offMinutes);
        expect(offset).toEqual(fDate);
    });
});