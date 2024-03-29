const express = require('express');
const cookieParser = require('cookie-parser');
const app =express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy')
const MongoStore = require('connect-mongo');
const { urlencoded } = require('express');
const sassMiddleWare = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

// for sass
app.use(sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
})); 


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads part available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));
// use express Router
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db


app.use(session({
    name: 'codeial',
    // to do change the secret before deployment in the production mode

    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove: 'disabled' 
        },
        function(err){
            console.log(err || 'connect-mongo setup ok')
        } 
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMWare.setFlash);

app.use('/',require('./routes/index'))

app.listen(port, function(err){
    if(err){
        console.log(`Error int running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
})

