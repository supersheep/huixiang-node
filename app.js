require('rootpath')();
var express = require('express');
var config = require('config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var async = require('async');
var bodyParser = require('body-parser');
var compression = require('compression');
var passport = require('passport');

var app = express();
var routes = require("./routes");
var services = require('./services');

require("./util/passport-init");

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session_secret,
    cookie: { maxAge: 60 * 24 * 60 * 60 * 1000 },
    resave: true,
    unset: "destroy",
    saveUninitialized: true
}));
app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    req.services = services;
    res.locals.config = config;
    res.locals.moment = require('moment');
    res.locals.title = config.sitename + "-" + config.slogan;
    res.locals.user = req.user;
    next();
});

app.use('/', routes.pages);
app.use('/api', routes.api);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.send(500, err);
});

app.listen(1234);
console.log("server started at http://localhost:" + 1234);
