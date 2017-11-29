const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const _Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {

    _Leaders.find({})
    .then((leaders) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err)=> next(leaders))
    .catch((err)=> next(err));
})
.post( (req, res, next) => {
    _Leaders.create(req.body).
    then( (leader) => {
        console.log('Leader  created ', leader);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) => {
    res.statusCode=403;
res.send('PUT operation not supported on Leaders' );
})
.delete((req, res, next) => {
    _Leaders.remove({})
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    _Leaders.findById(req.params.leaderId)
    .then( (leader) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    res.statusCode=403;
    res.send('POST operation not supported on /leaders/'+req.params.leaderId );
})
.put( (req, res, next) => {
    _Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body  
    }, {new: true} )
    .then( (leader) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    _Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports  = leaderRouter;

/*
leaderRouter.route('/')
    .all( (req, res , next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
next();
})
.get((req, res, next) => {
    res.send('will send all leader details   to you');
})
.post( (req, res, next) => {
    res.send('will add the leader: '+ req.body.name + ' with details '+ req.body.description );
})
.put( (req, res, next) => {
    res.statusCode=403;
res.send('PUT operation not supported on leaders' );
})
.delete((req, res, next) => {

    res.send('Deleting all the leaders from the record' );
});


leaderRouter.route('/:leaderId')
    .all( (req, res , next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
next();
})
.get((req, res, next) => {
    res.send('will send details of the leader '+ req.params.leaderId+ ' to you ');
})
.post( (req, res, next) => {
    res.statusCode=403;
    res.send('POST operation not supported on /leaders/'+req.params.leaderId );
})
.put( (req, res, next) => {
    res.write('Updating the leader details: '+ req.params.leaderId+ '\n' );
    res.end('Updated the Leader Details: '+ req.body.name + ' with details '+ req.body.description);
})
.delete((req, res, next) => {
    res.send('Deleting the Leader details: '+ req.params.leaderId );
});

*/