module.exports = function waiter(pool){
    
    let days = async function(waiter, shift) {
       const daysDb = "select days from days";
       const results = await pool.query(daysDb);
       
       if (results.rowCount === 0) {
        const SQLinsert = "insert into days_availability(names_id, days_id) values ($1, $2)"
        await pool.query(SQLinsert, [waiter,shift, 1])
    }
    
    }


return{
    days

}
}