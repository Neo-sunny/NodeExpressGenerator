const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

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

module.exports  = leaderRouter;