// const factoryWater = require('./waiter');
let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const pg = require("pg");
// const Pool = pg.Pool;


let app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

// //` which db connection to use
// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_waiter';


// const pool = new Pool({
//   connectionString
 
// });

// const waiters = factoryWater(pool)

app.get("/", function(req, res){
    res.render("index");
  });

app.get("/waiters/:username", function(req, res){
    res.render("index");

  });

app.post("/waiters/:username", function(req, res){
    res.render("index");
    
  });

app.get("/days", function(req, res){
    res.render("index");
    
  });


  


  const PORT = process.env.PORT || 3010;
  app.listen(PORT, function () {
    console.log('App started at port:', PORT);
  })
