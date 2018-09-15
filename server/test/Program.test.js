require('../config/config');
const moment = require('moment');
const expect = require('expect');
const { db, ExecuteNonQuery, ExecuteScalar } = require('../database/Database');
const { AddNewProgram, GetProgramData, GetProgramEntry, UpdateProgram } = require('../database/Program');
const utils = require('../utils/Utils');
const { LastRowID } = require('../database/Common');

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

    it(`should have specific entry: ${moment(sDate).local()}, Test Program 2, ${moment(eDate).local()}...`, async () => {
        AddNewProgram('Test Program 2', sDate, eDate);
        const lrId = await LastRowID();
        const val = await GetProgramEntry(lrId);
        expect(val).toMatchObject({name:'Test Program 2', startDateTime: sDate, endDateTime: eDate});
    });

    it(`should properly update an entry...`, async () => {
        let val = await GetProgramData();
        expect(val.length >=2 ).toBeTruthy();
        let element = val[1];
        const id = element.id;
        await UpdateProgram(id, 'Program Updated', element.startDateTime, element.endDateTime);
        val = await GetProgramData();
        expect(val[1]).toMatchObject({name:'Program Updated', startDateTime: sDate, endDateTime: eDate});
    });
});