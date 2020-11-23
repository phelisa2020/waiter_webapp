<div class="container">
    <h1>{{this.waiter}}'s Schedule</h1>
    <form action="/waiters/{{this.waiter}}" method="post">
    
        {{#each daysList}}
        <input type="checkbox" name="day" value="{{this.weekdays}}" {{this.state}}>
        <label for="all"> {{this.weekdays}}</label>
        {{/each}}

        <input type="submit" value="Add Days">
    </form>
    <div class="error">
        <h3>
            {{messages.error}}
        </h3>
    </div>
    <div class="pass">
        <h3>
            {{messages.pass}}
        </h3>
    </div><br>
    <button><a href="/">home</a></button>
</div>

<script>
    setTimeout(function () {
        document.querySelector(".pass").innerHTML = ""
    }, 1000)
    setTimeout(function () {
        document.querySelector(".error").innerHTML = ""
    }, 1000)
</script>


<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>greetings</title>
	<link rel="stylesheet" href="css/waiter.css">
</head>

<body>
	
<div class="container">
    <h1>{{this.username}}</h1>
    <br>
    <h3>Days you want to work on</h3>
    <br>


    <form action="/waiters/{{username}}" method="POST">

        {{#each weekday}}
        {{!-- looping my days from the database --}}
        <input type='checkbox' name='day' class='days' value="{{this.days}}">
        <span class='label-body'>{{this.days}}</span>

        {{/each}}
         <input type="submit" value="Add Days">
    </form>
    <div class="error">
        <h3>{{messages.error}}</h3>
    </div>

    <div class="pass">
        <h3>{{messages.pass}}</h3>
    </div>

    <button><a href="/">back</a></button>



</div>


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
  req.flash('info', 'Welcome');
  res.render('index', {
    title: 'Home'
  })
});
app.get('/addFlash', function (req, res) {
  req.flash('success', 'Flash Message Added');
  res.redirect('/');
});


app.get("/waiters/:username", async function (req, res) {
  const username = req.params.username;
  const weekday = await waiterRoutes.waiter(username)
  console.log(weekday)
  await waiterRoutes.getDays()
  res.render('waiter', {
    username: username

  })
});


app.post("/waiters/:username", async function (req, res) {

  const username = req.params.username;
  const weekday = req.body.day;
  console.log(weekday)
  await waiterRoutes.daysAvailable(username, weekday)

  const daysShift = await waiterRoutes.getDays()
  res.render('waiter', {
    username: username,
    weekday: daysShift
 
  })

})


app.get("/back", async function (req, res) {

  const weekday = await waiterRoutes.daysAvailable()
  res.render('waiters', {
    weekday: weekday
  })
});


const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
  console.log('App started at port:', PORT);
})

