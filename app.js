const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
require('./passport/passport');
require('./database');

const routes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middlewares
app.use((req, res, next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res,next) =>{
    app.locals.Loginmessage = req.flash('Loginmessage');
    next();
});
app.use((req, res,next) =>{
    app.locals.Registermessage = req.flash('Registermessage');
    next();
});


//routes
app.use(routes);


//static files
app.use(express.static(path.join(__dirname, '/public')));


//start server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
});
