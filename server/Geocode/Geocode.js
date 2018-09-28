const axios = require('axios');

const Location = async (address) => {
    const locURL = process.env.MAPURL + `${encodeURIComponent(address)}` + '&key=' + process.env.MAPAPIKEY;
    const response = await axios.get(locURL);
    return response.data;
};

module.exports = { Location };