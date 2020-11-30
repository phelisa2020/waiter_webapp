module.exports = function waiter(pool) {


    async function daysAvailable(waiter, days) {
         await waiters(waiter)
        const waiterId = await getWaitersNames(waiter);

        for (var i = 0; i < days.length; i++) {
            
            const daysId = await getWaitersDays(days[i])
            console.log(waiterId, 'kjhgf'); // {id:4}

            const SQLinsert = "insert into shifts(names_id, days_id) values ($1, $2)"
            await pool.query(SQLinsert, [waiterId.id, daysId.id]);
        }

    }



    // let daysId = async function(ids) {

    //     let ids = "select id from days where days = $1"
    //     // let results = await pool.query([ids];
    //     console.log(results.rows[0].id);

    //     return results.rows[0].id;

    //     }


    async function admin() {

        const result = await pool.query('select days, names from shifts join days on shifts.days_id = days.id join names on shifts.names_id = names.id ORDER BY days.id ASC')
        console.log(result.rows);

        return result.rows
    }

    async function waiters(name) {
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const SQLcheck = "select id from names where names = $1";
        const results = await pool.query(SQLcheck, [waiters]);

        if (results.rowCount === 0) {
            const SQLinsert = "insert into names(names) values ($1)"
            await pool.query(SQLinsert, [waiters])
            return "Waiter added successfully"
        }
    }


    async function getWaitersNames(name) {
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const SQLcheck = "select id from names where names = $1";
        const results = await pool.query(SQLcheck, [waiters])
        return results.rows[0]
    }

    async function getWaitersDays(day) {
        const SQLcheck = "select id from days where days = $1";
        const results = await pool.query(SQLcheck, [day])
        return results.rows[0]
    }


    async function getDays() {
        var list = await pool.query("select days from days")
        return list.rows
    }
    async function clear() {
        var reset = await pool.query("delete from shifts");

        return reset
    }

    async function dayColor() {

        try {

            // const colorDay = await pool.query('select days from days')
            const shift = await admin()
            console.log(shift);
            // const rows = colorDay.rows

            await rows.forEach(async (day) => {
                day.names = []
                // day.color = ''

                shift.forEach(async (waiter) => {

                    if (day.days === waiter.days) {

                        day.names.push(waiter);

                    }

                    if (day.names.length === 3) {
                        day.color = "green"

                    }
                    else if (day.names.length < 3) {
                        day.color = "orange"

                    }

                    else if (day.names.length > 3) {
                        day.color = "red"
                        day.message = "day are full "

                    }

                })

            })

            console.log(rows);

            return rows;

        } catch (error) {
        }
    }


    return {
        daysAvailable,
        waiters,
        getDays,
        getWaitersNames,
        getWaitersDays,
        clear,
        // daysId,
        admin,
        dayColor



    }

}
