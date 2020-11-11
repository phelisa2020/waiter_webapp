const assert = require('assert');
const factoryWater = require('../waiter');
let pg = require("pg");
let Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_waiter_test';
let pool = new Pool({
    connectionString
});


