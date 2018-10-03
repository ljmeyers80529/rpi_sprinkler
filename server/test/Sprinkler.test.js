require('../config/config');
const database = require('../database/Database');
const expect = require('expect');
const sprinkler = require('../database/Sprinkler');
const program = require('../database/Program');
const { LastRowID } = require('../database/Common');

describe('Datebase sprinkler table...', () => {
    let initial = {program: 0, valveNumber: 1, minDuration: 10, maxDuration: 30, manualTimeOn: 2, allowedDays: 1, skipRain: 0}
    let updated = {program: 0, valveNumber: 5, minDuration: 5, maxDuration: 45, manualTimeOn: 5, allowedDays: 1, skipRain: 0}
    let addedId;

    before( async () => {
        await database.ExecuteNonQuery('DELETE FROM Sprinkler');
        await database.ExecuteNonQuery('DELETE FROM Program');
        await program.AddNewProgram('Program 1', new Date().getTime(), new Date().getTime());
        initial.program = await LastRowID();
        updated.program = initial.program;
    });

    it('should add a new sprinkler entry...', async () => {
        await sprinkler.AddNewSprinkler(initial.program, initial.valveNumber, initial.minDuration, initial.maxDuration, initial.manualTimeOn, initial.allowedDays, initial.skipRain);
        addedId = await LastRowID();
        const entry = await sprinkler.GetSprinklerEntry(addedId);
        expect(entry).toMatchObject(initial);
    });

    it('should update a sprinkler entry...', async () => {
        await sprinkler.UpdateSprinkler(addedId, updated.program, updated.valveNumber, updated.minDuration, updated.maxDuration, updated.manualTimeOn, updated.allowedDays, updated.skipRain);
        const entry = await sprinkler.GetSprinklerEntry(addedId);
        expect(entry).toMatchObject(updated);
    });

    it('should remove a sprinkler entry...', async () => {
        await sprinkler.AddNewSprinkler(initial.program, initial.valveNumber, initial.minDuration, initial.maxDuration, initial.manualTimeOn, initial.allowedDays, initial.skipRain);
        let entry = await sprinkler.GetSprinkler();
        expect(entry.length === 2).toBeTruthy();
        await sprinkler.DeleteSprinkler(entry[0].rowid);
        entry = await sprinkler.GetSprinkler();
        expect(entry.length === 1).toBeTruthy();
    });
});

