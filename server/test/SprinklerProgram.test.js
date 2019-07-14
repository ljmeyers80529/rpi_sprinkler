require('../config/config');
const moment = require('moment');
const expect = require('expect');
const utils = require('../utils/Utils');
const database = require('../database/Database');
const sprinkler = require('../database/Sprinkler');
const program = require('../database/Program');
const { LastRowID } = require('../database/Common');

describe('Database Program / Sprinkler...', () => {
    const base = utils.dateTimeOffset(new Date(moment().local()).getTime(), -12, 0, 0);
    const s1Date = utils.dateTimeOffset(base, 7, 8, 11);
    const e1Date = utils.dateTimeOffset(s1Date, 3, 11, 33);
    const s2Date = utils.dateTimeOffset(e1Date, 0, 0, 1);
    const e2Date = utils.dateTimeOffset(s2Date, 11, 16, 23);
    const s3Date = utils.dateTimeOffset(e2Date, 0, 0, 1);
    const e3Date = utils.dateTimeOffset(s3Date, 19, 12, 52);
    let program1_1 = {program: 'Program 1', startDateTime: s1Date, endingDateTime: e1Date, programId: 0,
                        valveNumber: 1, minDuration: 5, maxDuration: 45, manualTimeOn: 5, allowedDays: 1, skipRain: 0}
    let program1_2 = {program: 'Program 1', startDateTime: s1Date, endingDateTime: e1Date, programId: 0,
                        valveNumber: 2, minDuration: 5, maxDuration: 35, manualTimeOn: 5, allowedDays: 2, skipRain: 0}
    let program2_1 = {program: 'Program 2', startDateTime: s2Date, endingDateTime: e2Date, programId: 0,
                        valveNumber: 3, minDuration: 5, maxDuration: 35, manualTimeOn: 5, allowedDays: 4, skipRain: 0}
    let program3_1 = {program: 'Program 3', startDateTime: s3Date, endingDateTime: e3Date, programId: 0,
                        valveNumber: 4, minDuration: 5, maxDuration: 25, manualTimeOn: 5, allowedDays: 7, skipRain: 1}

    before(async () => {
        await database.ExecuteNonQuery('DELETE FROM Program');
        await database.ExecuteNonQuery('DELETE FROM Sprinkler');
        await program.AddNewProgram(program1_1.program, program1_1.startDateTime, program1_1.endingDateTime);
        program1_1.programId = await LastRowID();
        program1_2.programId = program1_1.programId;

        await program.AddNewProgram(program2_1.program, program2_1.startDateTime, program2_1.endingDateTime);
        program2_1.programId = await LastRowID();

        await program.AddNewProgram(program3_1.program, program3_1.startDateTime, program3_1.endingDateTime);
        program3_1.programId = await LastRowID();

        await sprinkler.AddNewSprinkler(program1_1.programId, program1_1.valveNumber, program1_1.minDuration,
                                        program1_1.maxDuration, program1_1.manualTimeOn, program1_1.allowedDays, 
                                        program1_1.skipRain);

        await sprinkler.AddNewSprinkler(program2_1.programId, program2_1.valveNumber, program2_1.minDuration,
                                        program2_1.maxDuration, program2_1.manualTimeOn, program1_1.allowedDays, 
                                        program2_1.skipRain);

        await sprinkler.AddNewSprinkler(program3_1.programId, program3_1.valveNumber, program3_1.minDuration,
                                        program3_1.maxDuration, program3_1.manualTimeOn, program3_1.allowedDays, 
                                        program3_1.skipRain);

        await sprinkler.AddNewSprinkler(program1_2.programId, program1_2.valveNumber, program1_2.minDuration,
                                        program1_2.maxDuration, program1_2.manualTimeOn, program1_2.allowedDays, 
                                        program1_2.skipRain);
    });

    it('should retrieve sprinkler information for today...', async () => {

    });
}); 