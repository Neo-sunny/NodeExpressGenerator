var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const url ='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
    useMongoClient: true
});
connect.then((db) => {
  console.log('connected to the Express server ');
}, (err)=>{ console.log(err); });

var app = express();

// redirecting all requests to particular url
app.all('*', (req, res, next) =>{
  if(req.secure){
    next();
  }else{
    res.redirect(307,'https://' +req.hostname+':'+app.get('secPort')+req.url);

  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Instead of cookie parser we will use session
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use('/', index);
app.use('/users', users);

function auth(req, res, next){
  console.log(req.session);

if(!req.session.user){ // If request does not contains signedCookies

  // then go for Basic authentication
 //   var authHeader= req.headers.authorization;
 //   if(!authHeader){
      var err=new Error("You are not authenticated ");
      err.status=401;
//      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }
/*
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

    var userName= auth[0];
    var pass= auth[1];
    if(userName== 'admin' && pass== 'password'){
      req.session.user= 'admin';
      next();
    }else{
      err = new Error("You are not authenticated ");
      err.status=401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }}*/
  else{
    if(req.session.user === 'authenticated'){
      next();
    }else{
      var err=new Error("You are not authenticated ");
      err.status=401;
      return next(err);
    }
  }
  
}




/* Using Cookies with Basic Authentication
function auth(req, res, next){
  console.log(req.signedCookies);

if(!req.signedCookies.user){ // If request does not contains signedCookies

  // then go for Basic authentication
    var authHeader= req.headers.authorization;
    if(!authHeader){
      var err=new Error("You are not authenticated ");
      err.status=401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

    var userName= auth[0];
    var pass= auth[1];
    if(userName== 'admin' && pass== 'password'){
      res.cookie('user','admin',{signed:true});
      next();
    }else{
      err = new Error("You are not authenticated ");
      err.status=401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }
  }else{
    if(req.signedCookies.user==='admin'){
      next();
    }else{
      var err=new Error("You are not authenticated ");
      err.status=401;
      return next(err);
    }
  }
  
}
*/

/*  Using Basic Authorization
function auth(req, res, next){
  console.log(req.headers);
  var authHeader= req.headers.authorization;
      if(!authHeader){
        var err=new Error("You are not authenticated ");
        err.status=401;
        res.setHeader('WWW-Authenticate', 'Basic');
        return next(err);
      }

      var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

      var userName= auth[0];
      var pass= auth[1];
      if(userName== 'admin' && pass== 'password'){
          next();
      }else{
        err = new Error("You are not authenticated ");
        err.status=401;
        res.setHeader('WWW-Authenticate', 'Basic');
        return next(err);
      }
}
*/
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
