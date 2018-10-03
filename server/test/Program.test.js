require('../config/config');
const moment = require('moment');
const expect = require('expect');
const utils = require('../utils/Utils');
const database = require('../database/Database');
const program = require('../database/Program');
const { LastRowID } = require('../database/Common');

describe('Database program table...', () => {
    let sDate = new Date().getTime();
    let eDate = utils.dateTimeOffset(sDate, 7, 11, 49).getTime();

    before(async () => {
        await database.ExecuteNonQuery('DELETE FROM Program');
    });

    it('should be empty...', async () => {
        const val = await program.GetProgramData();
        expect(val).toHaveLength(0);
    });

    it('should have one (1) entry...', async () => {
        program.AddNewProgram('Test Program 1', sDate, eDate);
        const val = await program.GetProgramData();
        expect(val).toHaveLength(1);
    });

    it(`should contain ${moment(sDate).local()}, Test Program 1, ${moment(eDate).local()}...`, async () => {
        const val = await program.GetProgramData();
        expect(val).toMatchObject([{name:'Test Program 1', startDateTime: sDate, endDateTime: eDate}]);
    });

    it(`should have specific entry: ${moment(sDate).local()}, Test Program 2, ${moment(eDate).local()}...`, async () => {
        program.AddNewProgram('Test Program 2', sDate, eDate);
        const lrId = await LastRowID();
        const val = await program.GetProgramEntry(lrId);
        expect(val).toMatchObject({name:'Test Program 2', startDateTime: sDate, endDateTime: eDate});
    });

    it(`should properly update an entry...`, async () => {
        let val = await program.GetProgramData();
        expect(val.length >=2 ).toBeTruthy();
        let element = val[1];
        const id = element.rowid;
        await program.UpdateProgram(id, 'Program Updated', element.startDateTime, element.endDateTime);
        val = await program.GetProgramData();
        expect(val[1]).toMatchObject({name:'Program Updated', startDateTime: sDate, endDateTime: eDate});
    });

    it("should get program entry based on today's date...", async () => {
        const id = (await program.GetProgramIdUsingTodaysDate()).rowid;
        expect(id).toBe(1);
    });
});
