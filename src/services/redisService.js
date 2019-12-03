const Redis = require("ioredis");
/*const redis = new Redis({
    port: 6379,
    host: 'localhost',
    password: "pandaChina",
    db : 0
});*/

class Cache {
    constructor() {
        this.redis = new Redis({
            port: 7001,
            host: 'localhost',
            db: 0
        });
        //this.redis = new Redis('redis://10.0.0.2:6379/4')
    }

    async get(key, storeFunction) {
        const value = JSON.parse(await this.redis.get(key));
        if (value) {
            return value;
        }

        const newValue = await storeFunction();
        this.redis.set(key, JSON.stringify(newValue));
        return newValue;
    }

    del (key)
    {
        this.redis.del(key);
    }
}
module.exports = Cache;