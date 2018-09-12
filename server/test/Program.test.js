require('../config/config');
const moment = require('moment');
const expect = require('expect');
const { db, ExecuteNonQuery } = require('../database/Database');
const { AddNewProgram, GetProgramData } = require('../database/Program');
const utils = require('../utils/Utils');

describe('Database program table...', () => {
    let sDate = new Date().getTime();
    let eDate = utils.dateTimeOffset(sDate, 7, 11, 49).getTime();

    before(() => {
        db.serialize(() => {
            ExecuteNonQuery('DELETE FROM Program');
        });
    });

    it('should be empty...', async () => {
        const val = await GetProgramData();
        expect(val).toHaveLength(0);
    });

    it('should have one (1) entry...', async () => {
        AddNewProgram('Test Program 1', sDate, eDate);
        const val = await GetProgramData();
        expect(val).toHaveLength(1);
    });

    it(`should contain ${moment(sDate).local()}, Test Program 1, ${moment(eDate).local()}...`, async () => {
        const val = await GetProgramData();
        expect(val).toMatchObject([{name:'Test Program 1', startDateTime: sDate, endDateTime: eDate}]);
    });

    // it(`should have specific entry `)
});
