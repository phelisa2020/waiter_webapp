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
 
 
  // it("should be able to clear the database.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.daysAvailable('Phelisa', ['Monday', 'Tuesday', 'Wednesday']);
  //   await waiter.clear();

  //   const allReg = await waiter.getWaitersNames();
  //   assert.deepStrictEqual([], allReg)
  // })
  // it("tests if the database clears three datasets.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Ammaar', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
  //   await waiter.addUser('Joe', ['Tuesday', 'Monday', 'Friday']);
  //   await waiter.addUser('Henry', ['Monday', 'Friday']);
  //   await waiter.clearDataBase();
  //   assert.deepEqual(await waiter.daysNames(), [])
  // })
  // it("tests if the database clears one dataset.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Jenna', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
  //   await waiter.clearDataBase();
  //   assert.deepEqual(await waiter.daysNames(), []);
  // })



  // it("should be able to return orange if the number of waiters is more than 3.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   let waiterCount = 4

  //   assert.strictEqual(await waiter.colourDays(waiterCount
  //   ), 'orange');
  // })

  // it("returns green if the number of waiters is equal to 3.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   let waiterCount = 3
  //   assert.equal(await waiter.dayColor(waiterCount), 'green');
  // })

  // it("returns red if the number of waiters is less than 3.",async function () {
  //   let waiter = factoryWaiter(pool);
  //   let waiterCount = 2
  //   assert.equal(await waiter.dayColor(waiterCount), 'red');
  
  // })
  // it("should count 6 workers for monday.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Ammaar', ['Monday']);
  //   await waiter.addUser('Joe', ['Monday',]);
  //   await waiter.addUser('Thomas', ['Monday',]);
  //   await waiter.addUser('Jen', ['Monday',]);
  //   await waiter.addUser('Low', ['Monday',]);
  //   await waiter.addUser('Lee', ['Monday',]);
  //   const waiterCount = await waiter.waitersWorking(1)
  //   assert.equal(await waiterCount.length, 6)

  // })
  // it("should count 2 workers for Tuesday.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Ammaar', ['Tuesday']);
  //   await waiter.addUser('Joe', ['Tuesday']);
  //   const waiterCount = await waiter.waitersWorking(2)
  //   assert.equal(await waiterCount.length, 2)

  // })
  // it("should count 3 workers for Wednesday.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Jody', ['Wednesday']);
  //   await waiter.addUser('Ester', ['Wednesday']);
  //   const waiterCount = await waiter.waitersWorking(3)
  //   assert.equal(await waiterCount.length, 2)

  // })
  // it("should count 1 worker for Friday.", async function () {
  //   let waiter = factoryWaiter(pool);
  //   await waiter.addUser('Timothy', ['Friday']);
  //   const waiterCount = await waiter.waitersWorking(5)
  //   assert.equal(await waiterCount.length, 1)

  // })


})




