module.exports = function waiter(pool) {

    async function daysAvailable(waiter, days) {
        const daysDb = "select days from days";
        const results = await pool.query(daysDb);

        if (results.rowCount === 0) {
            const SQLinsert = "insert into shifts(names_id, days_id) values ($1, $2)"
            await pool.query(SQLinsert, [waiter, days]);
        }

    }



    async function waiter(name) {
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const SQLcheck = "select id from names where names = $1";
        const results = await pool.query(SQLcheck, [waiters]);

        if (results.rowCount === 0) {
            const SQLinsert = "insert into names(names) values ($1)"
            await pool.query(SQLinsert, [waiters])
            return "Waiter added successfully"
        }
    }


    async function getWaitersNames() {
        const checkingSQL = "select names from names";
        const results = await pool.query(checkingSQL)
        return results.rows[0]
    }


    async function getDays() {
        var list = await pool.query("select days from days")
        return list.rows
    }
    async function colourDays() {


    }


    async function clear() {
        var reset = await pool.query("delete from shifts");

        return reset
    }


    return {
        daysAvailable,
        waiter,
        getDays,
        getWaitersNames,
        clear,
        colourDays
       


    }

}
