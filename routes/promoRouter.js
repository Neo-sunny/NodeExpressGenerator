const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all( (req, res , next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) => {
    res.send('will send all promotions  to you');
})
.post( (req, res, next) => {
    res.send('will add the promotion: '+ req.body.name + ' with details '+ req.body.description );
})
.put( (req, res, next) => {
    res.statusCode=403;
    res.send('PUT operation not supported on promotions' );
})
.delete((req, res, next) => {

    res.send('Deleting all the promotions' );
});


promoRouter.route('/:promoId')
    .all( (req, res , next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
next();
})
.get((req, res, next) => {
    res.send('will send details of the promotion '+ req.params.promoId+ ' to you ');
})
.post( (req, res, next) => {
    res.statusCode=403;
    res.send('POST operation not supported on /promotions/'+req.params.promoId );
})
.put( (req, res, next) => {
    res.write('Updating the promotion: '+ req.params.promoId+ '\n' );
    res.end('Updated the promotion: '+ req.body.name + ' with details '+ req.body.description);
})
.delete((req, res, next) => {
    res.send('Deleting the promotion: '+ req.params.promoId );
});

module.exports  = promoRouter;