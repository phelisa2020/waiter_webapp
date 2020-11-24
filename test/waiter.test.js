const assert = require('assert');
const factoryWaiter = require('../waiter');
let pg = require("pg");
let Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_waiter_test';
let pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
      
            await pool.query(`delete from names`);

    });
    

  it("Should be able to select 3 days which is S, M, T of waiter", async function () {
    let waiter = factoryWaiter(pool);
    await waiter.daysAvailable('phelisa', ['Sunday','Monday', 'Tuesday']);
    assert.deepStrictEqual([
      {
        username: 1,
        weekday: 1
      }],
      [{
        username: 1,
        weekday: 1
      }],
      [{
        username: 1,
        weekday: 2
      }],
      [{
        username: 1,
        weekday: 3
      }
    ],await waiter.getDays())

  })
  it("Should be able to select 3 days which is W, T, F of Aza", async function () {
    let waiter = factoryWaiter(pool);
    await waiter.daysAvailable('aza', ['Wednesday', 'Thursday', 'Friday',]);
    assert.deepStrictEqual([
      {
        username: 1,
        weekday: 3
      }],
      [{
        username: 1,
        weekday: 3
      }],
      [{
        username: 1,
        weekday: 4
      }],
      [{
        username: 1,
        weekday: 5
      }
    ],await waiter.getDays()

    )

  })

  it("Should be able to select 5 days which is M, T, W, T, F of Some", async function () {
    let waiter = factoryWaiter(pool);
    await waiter.daysAvailable('aza', ['Wednesday', 'Thursday', 'Friday',]);
    assert.deepStrictEqual([
      {
        username: 1,
        weekday: 1
      }],
      
      [{
        username: 1,
        weekday: 1
      }],
      [{
        username: 1,
        weekday: 2
      }],
      [{
        username: 1,
        weekday: 3
      }],
      [{
        username: 1,
        weekday: 4
      }],
      [{
        username: 1,
        weekday: 5
      }
    ],await waiter.getDays()

    )

  })
 
  
})




