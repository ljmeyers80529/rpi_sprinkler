require('../config/config');
const moment = require('moment');
const expect = require('expect');
const { db, ExecuteNonQuery } = require('../database/Database');
const { AddNewProgram, GetProgramData } = require('../database/Program');

describe('Database program table...', () => {
    const sDate = new Date().getTime();
    const eDate = new Date(moment()).getTime() + 647340000;     // 7d 11h 49m

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

    it(`should contain ${eDate}, Test Program 1, ${sDate}...`, async () => {
        const val = await GetProgramData();
        expect(val).toMatchObject([{name:'Test Program 1', startDateTime: sDate, endDateTime: eDate}]);
    });
});
