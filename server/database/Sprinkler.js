const { ExecuteNonQuery, ExecuteScalar, ExecuteQuery } = require('./Database');

const GetSprinkler = () => {
    const getData = `SELECT rowid, program, minDuration, maxDuration, manualTimeOn,
                     allowedDays, skipRain
                     FROM Sprinkler`;
    return ExecuteQuery(getData);
}

const GetSprinklerEntry = (id) => {
    const getData = `SELECT program, minDuration, maxDuration, manualTimeOn,
                     allowedDays, skipRain, valveNumber
                     FROM Sprinkler
                     WHERE rowid = ${id}`;
    return ExecuteScalar(getData);
}

const AddNewSprinkler = (progamId, valveNum, minimumDuration, maximumDuration, manualOnTime, 
                         allowedDays, skipRainDelay) => {
    const newSprinkler = `INSERT INTO Sprinkler (program, minDuration, maxDuration,
                            manualTimeOn, allowedDays, skipRain, valveNumber)
                          VALUES (${progamId}, ${minimumDuration}, ${maximumDuration},
                            ${manualOnTime}, ${allowedDays}, ${skipRainDelay}, ${valveNum})`;
    return ExecuteNonQuery(newSprinkler);
};

const UpdateSprinkler = (id, progamId, valveNum, minimumDuration, maximumDuration, manualOnTime, 
                         allowedDays, skipRainDelay) => {
    const updateSprinkler = `UPDATE Sprinkler SET
                             program = ${progamId},
                             valveNumber = ${valveNum},
                             minDuration = ${minimumDuration},
                             maxDuration = ${maximumDuration},
                             manualTimeOn = ${manualOnTime},
                             allowedDays = ${allowedDays},
                             skipRain = ${skipRainDelay}
                             WHERE rowid = ${id}`;
    return ExecuteNonQuery(updateSprinkler);
};

const DeleteSprinkler = (id) => {
    const deleteSprinkler = `DELETE FROM Sprinkler WHERE rowid = ${id}`;
    return ExecuteNonQuery(deleteSprinkler);
};

module.exports = { AddNewSprinkler, GetSprinklerEntry, GetSprinkler, UpdateSprinkler, DeleteSprinkler };