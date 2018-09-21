const { ExecuteNonQuery, ExecuteScalar, ExecuteQuery } = require('./Database');

const GetSprinkler = () => {
    const getData = `SELECT programId, minDuration, maxDuration, manualTimeOn,
                     allowedDays, skipRain
                     FROM Sprinkler`;
    return ExecuteQuery(getData);
}

const GetSprinklerEntry = (id) => {
    const getData = `SELECT programId, minDuration, maxDuration, manualTimeOn,
                     allowedDays, skipRain
                     FROM Sprinkler
                     WHERE id = ${id}`;
    return ExecuteScalar(getData);
}

const AddNewSprinkler = (progamId, minimumDuration, maximumDuration, manualOnTime, 
                         allowedDays, skipRainDelay) => {
    const newSprinkler = `INSERT INTO Sprinkler (programId, minDuration, maxDuration,
                            manualTimeOn, allowedDays, skipRain)
                          VALUES (${progamId}, ${minimumDuration}, ${maximumDuration},
                            ${manualOnTime}, ${allowedDays}, ${skipRainDelay})`;
    return ExecuteNonQuery(newSprinkler);
};

const UpdateSprinkler = (progamId, minimumDuration, maximumDuration, manualOnTime, 
                         allowedDays, skipRainDelay) => {
    const updateSprinkler = `UPDATE Sprinkler SET
                             programId = ${progamId},
                             minDuration = ${minimumDuration},
                             maxDuration = ${maximumDuration},
                             manualTimeOn = ${manualOnTime},
                             allowedDays = ${allowedDays},
                             skipRain = ${skipRainDelay}`;
    return ExecuteNonQuery(updateSprinkler);
};

const DeleteSprinkler = (id) => {
    const deleteSprinkler = `DELETE FROM Sprinkle WHERE id = ${id}`;
    return ExecuteNonQuery(deleteSprinkler);
};

module.exports = { GetSprinkler, GetSprinklerEntry, UpdateSprinkler, DeleteSprinkler, AddNewSprinkler };
