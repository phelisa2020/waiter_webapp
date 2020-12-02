module.exports = function waiter(pool) {




    async function daysAvailable(waiter, days) {
        await waiters(waiter)

        const waiterId = await getWaitersNames(waiter);

        if (waiterId) {

            const x = await pool.query("delete from shifts where names_id=$1", [waiterId])

        }

        const arrayDay = Array.isArray(days) ? days : [days]
        for (var i = 0; i < arrayDay.length; i++) {

            const daysId = await getWaitersDays(arrayDay[i])
            // console.log(waiterId, 'kjhgf'); // {id:4}

            const SQLinsert = "insert into shifts(names_id, days_id) values ($1, $2)"
            await pool.query(SQLinsert, [waiterId, daysId.id]);
        }

    }



    async function admin() {

        const result = await pool.query('select days, names from shifts join days on shifts.days_id = days.id join names on shifts.names_id = names.id ORDER BY days.id ASC')
        // console.log(result.rows);

        return result.rows
    }

    

    async function waiters(name) {
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        var waiter = await pool.query('select * from names where names = $1', [waiters])

        if (waiter.rowCount === 0) {

            const SQLinsert = "insert into names(names) values ($1)"
            await pool.query(SQLinsert, [waiters])
            return "Waiter added successfully"
        }
        var SQLcheck = await pool.query("select id from names where names = $1", [waiters])
        return SQLcheck.rows[0].id
        // console.log(SQLcheck.rows.id)

    }


    async function getWaitersNames(name) {
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        const SQLcheck = "select id from names where names = $1";
        const results = await pool.query(SQLcheck, [waiters])
        return results.rows[0].id
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
            const days = await getDays()
            // console.log(shift);
            // const rows = colorDay.rows

            days.forEach(async (day) => {
                day.names = []
                // day.color = ''

                shift.forEach(async (waiter) => {

                    if (day.days === waiter.days) {

                        day.names.push(waiter);
                        // console.log(day.names)
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

            // console.log(days);

            return days;

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
