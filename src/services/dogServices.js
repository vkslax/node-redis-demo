const axios = require('axios');
const RedisService = require('../services/redisService');

const cache = new RedisService();

const getDogList = async () => {
    let response = [];
    const key = 'dogs';
    try {
        response = cache.get(key, async () => {
            const newValueToStore = await axios.get('https://dog.ceo/api/breeds/list/all');
            return newValueToStore.data;
        });
    }
    catch (e) {
        console.log(e);
    }
    return response;
};

const deleteDogList = async () => {
    const key = 'dogs';
    cache.del(key);
    return true;
};


const dogServices = {
    getDogList,
    deleteDogList
};

module.exports = dogServices;