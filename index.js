const factoryWaiter = require('./waiter');
let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const pg = require("pg");
const Pool = pg.Pool;
const flash = require('express-flash');
const session = require('express-session');


let app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

//` which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_waiter';


const pool = new Pool({
  connectionString

});

const waiterRoutes = factoryWaiter(pool)

app.use(session({
  secret: 'This is my warning message',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', function (req, res) {
  const username = req.params.username;

  req.flash('info', 'Welcome');
  res.render('index', {
    title: 'Home',
    username: username,

  })
});
app.get('/addFlash', function (req, res) {
  req.flash('success', 'Flash Message Added');
  res.redirect('/');
});


app.get("/waiters/:username", async function (req, res) {
  const username = req.params.username;
  const weekday = await waiterRoutes.waiters(username)
  //console.log(weekday)
  var daysShift =await waiterRoutes.getDays()
  res.render('waiter', {
    username: username,
    weekday: daysShift


  })
});


app.post("/waiters/:username", async function (req, res) {

  const username = req.params.username;
  const weekday = req.body.day;
  console.log(weekday)
   const daysShift = await waiterRoutes.getDays()
  const join = await waiterRoutes.daysAvailable(username, weekday)
  if (join) {
    req.flash('success', 'successfully updated the shifts') 
    } 
 
  res.render('waiter', {
    username: username,
    weekday: daysShift,
    join
 
  })

})

app.get("/days", async function (req, res){
const weekdays = await waiterRoutes.admin();
var days= await waiterRoutes.dayColor();
res.render('shift', {
  weekdays,days
})
})

app.get("/back", async function (req, res) {

  const weekday = await waiterRoutes.daysAvailable()
  res.render('waiters', {
    weekday: weekday
  })
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log('App started at port:', PORT);
})

