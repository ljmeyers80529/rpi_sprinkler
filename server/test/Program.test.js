require('../config/config');
const expect = require('expect');
const { db, ExecuteNonQuery } = require('../database/Database');
const { AddNewProgram, GetProgramData } = require('../database/Program');

describe('Database program table...', () => {

    before(() => {
        db.serialize(() => {
            ExecuteNonQuery('DELETE FROM Program');
        });
    });
    
    it('should be empty...', (done) => {
        GetProgramData()
            .then(val => {
                expect(val).toHaveLength(0);
                done();
            })
            .catch((e) => done(e));
    });

    it('should have one (1) entry...', (done) => {
        AddNewProgram('Test Program 1', new Date().getTime(), new Date().getTime());
        GetProgramData()
            .then(val => {
                expect(val).toHaveLength(1);
                done();
            })
            .catch((e) => done(e));
    });
});
