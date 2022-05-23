
var express   = require('express');
var app       = express();
var session   = require('express-session');
var authenticateToken= require("./controller/authenticateToken");
require('dotenv').config();
const methodOverride = require('method-override')
//const { urlencoded } = require('body-parser');
//var cookieParser = require('cookie-parser');

// active databases
var database  = require('./database/db');
const temp = require('./database/temp');

//active body parsing for post requests
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware
const {cryptGenerate} = require('./middleware/bcryptGen');


// error handling


// routes
const form = require('./routes/form');
const experiment = require('./routes/experiment');
const registration = require('./routes/registration');
const login = require('./routes/login');
const otp = require('./routes/otp');
const logout = require('./routes/logout');
const information = require('./routes/information');

//session
app.use(session({ 
  secret: cryptGenerate(process.env.Secret_Key),
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// index page

app.get('/',(req,res)=>{
  res.json({status:200,message:'Welcome to the Eventizer'});
})

app.use('/form',form); // not required
app.use('/experiment',experiment); //not required
app.use('/registration',registration); //validation complete
app.use('/login',login); // validation complete
app.use('/logout',logout);// complete
app.use('/otp',otp); //validation complete
app.use('/information',information); //dont touch yet

// connection created
app.listen(process.env.PORT,()=>{
    console.log('Server is listening on port->'+process.env.PORT);
});


