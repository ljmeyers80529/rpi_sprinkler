const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./rpiSprinkler.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);

// table definitions.
const programCreateTable = `CREATE TABLE IF NOT EXISTS Program
                            (id INTEGER PRIMARY KEY,
                            name TEXT NOT NULL,
                            startDateTime INTEGER NOT NULL,
                            endDateTime INTEGER NOT NULL)`;

const sprinklerCreateTable = `CREATE TABLE IF NOT EXISTS Sprinkler
                              (id INTEGER PRIMRY KEY,
                              programId INTEGER NOT NULL,
                              minDuration INTEGER NOT NULL,
                              maxDuration INTEGER NOT NULL,
                              manualTimeOn INTEGER NOT NULL,
                              skipRain INTEGER NOT NULL,
                              useWeatherConditions INTEGER NOT NULL,
                              FOREIGN KEY(programId) REFERENCES Program(id))`;

const stateCreateTable = `CREATE TABLE IF NOT EXISTS State
                          (RainDelay INTEGER NOT NULL,
                           Autorun INTEGER NOU NULL)`;

const stateCheckExists = `SELECT RainDelay FROM State`;

const statePrePopulate = `INSERT INTO State (RainDelay, AutoRun) VALUES (0, false)`;

// execute non-query SQL statements.
const ExecuteNonQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

// execute SELECT statements.
const ExecuteQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(err);
            }
        });
    });
};

// execute command that returns a single data element or row.
const ExecuteScalar = (sql) => {
    return new Promise((resolve, reject) => {
        db.get(sql, (err, row) => {
            if (!err) {
                resolve(row);
            } else {
                reject(err);
            }
        });
    });
};

// open database connection, creating the data tables if this is the first time run.
// preset state condition required for running the system.
db.serialize(async() => {
    await ExecuteNonQuery(programCreateTable);
    await ExecuteNonQuery(sprinklerCreateTable);
    await ExecuteNonQuery(stateCreateTable);
    const entry = await ExecuteScalar(stateCheckExists);
    if (!entry) {
        await ExecuteNonQuery(statePrePopulate);
    }
});

module.exports = { db, ExecuteNonQuery, ExecuteQuery, ExecuteScalar };