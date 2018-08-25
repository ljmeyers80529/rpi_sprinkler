const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./rpiSprinkler.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);

// table definitions.
const programCreateTable = `CREATE TABLE IF NOT EXISTS Program
                            (id INTEGER PRIMARY KEY,
                            name TEXT NOT NULL,
                            startDate INTEGER NOT NULL,
                            endDate INTEGER NOT NULL,
                            startTime INTEGER NOT NULL,
                            endTime INTEGER NOT NULL)`;

const sprinklerCreateTable = `CREATE TABLE IF NOT EXISTS Sprinkler
                                (id INTEGER PRIMRY KEY,
                                programId INTEGER NOT NULL,
                                minDuration INTEGER NOT NULL,
                                maxDuration INTEGER NOT NULL,
                                skipRain INTEGER NOT NULL,
                                FOREIGN KEY(programId) REFERENCES Program(id))`;

// execute non-query SQL statements.
const ExecuteNonQuery = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (!err) {
                resolve(this.changes);
            } else {
                reject(err);
            }
        });
    });
};

// execute SELECT statements.
const ExecuteQuery = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(err);
            }
        });
    });
};

// execute command that returns a single data element or row.
const ExecuteScalar = (sql, ...params) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (!err) {
                resolve(row);
            } else {
                reject(err);
            }
        });
    });
};

// open database connection, creating the data tables if this is the first time run.
db.serialize(async() => {
    console.log('Creation...');
    await ExecuteNonQuery(programCreateTable);
    await ExecuteNonQuery(sprinklerCreateTable);
});

module.exports = { db, ExecuteNonQuery, ExecuteQuery, ExecuteScalar };