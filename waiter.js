module.exports = function waiter(pool){

    async function daysAvailable (waiter, days) {
        const daysDb = "select days from days";
        const results = await pool.query(daysDb);
        
        if (results.rowCount === 0) {
         const SQLinsert = "insert into days_availability(names_id, days_id) values ($1, $2)"
         await pool.query(SQLinsert, [waiter, days]);
     }
     
     }
     

  
     async function waiter(name){
        var waiters = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
		const SQLcheck = "select id from names where names = $1";
		const results = await pool.query(SQLcheck, [waiters]);

		if (results.rowCount === 0) {
			const SQLinsert = "insert into names(names) values ($1)"
			await pool.query(SQLinsert, [name])
		}
     }

     async function getWaitersNames() {
		const checkingSQL = "select names from names";
		const results = await pool.query(checkingSQL)
		return results.rows[0]
    }
    
    async function getDays() {
        var list = await pool.query("select * from days")
        return list.rows
    }
   
    // async function waitersDays(x) {
    //     const lists = await pool.query(`select weekdays_name from shifts where waiters_name = $1`, [x])
    //     var lst = lists.rows

    //     var dai = await pool.query(`select * from weekdays`)
    //     var day = dai.rows;

    //     day.forEach(allDays => {
    //         lst.forEach(WaiterDays => {
    //             if (WaiterDays.weekdays_name === allDays.weekdays) {
    //                 allDays.state="checked"
    //             }
    //         })
    //     })
    //      return day
    // }

    async function clear() {
		var reset = await pool.query("delete from days_availability");

		return reset
	}
  
         
        return {
            daysAvailable,
            waiter,
            getDays,
            getWaitersNames,
            clear

           
        }
    
    }
