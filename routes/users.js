const mongoose = require('mongoose');
var express = require('express');
const bodyParser = require('body-parser');
var User= require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next){

  User.findOne({username: req.body.username})
  .then( (user) => {
    if(user != null){
      var err= new Error('User '+ req.body.username+ ' already exists');
      err.status = 403;
      next(err);
    }else{
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  }).then( (user) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type', 'application/json');
    //res.json({status: 'Registration successful! ', user: user}, (err) => next(err));
    res.status(200).json({status: 'Registration successful! ', user: user}, (err) => next(err));
  } )
 .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
  if(!req.session.user){ // If request does not contains signedCookies
    
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

        User.findOne({username:userName })
        .then( (user) =>{
          if(user.username === userName && user.password === pass){
            req.session.user= 'authenticated';
            res.statusCode=200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('You are Authenticated! ');

          }else if(user.password !== pass){
            var err = new Error('Your password is incorrect ');
            err.status = 403;
            return next(err);
          }
          
          else if(user.username === null ){
            err = new Error("User " + username+ " does not exist  ");
            err.status=401;
            res.setHeader('WWW-Authenticate', 'Basic');
            return next(err);
          }
        } )  
        .catch( (err) => next(err) );
        
      }else{
        res.statusCode= 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated ');
      }
})

router.get('/logout', (req, res) =>{
    if(req.session){
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
    }else{
      var err = new Error('You are not logged in');
      err.status = 403;
      next(err);
    }
})
module.exports = router;
