const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const _Promos = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {

    _Promos.find({})
    .then((promos) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.post( (req, res, next) => {
    _Promos.create(req.body).
    then( (promo) => {
        console.log('Promotion created ', promo);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) => {
    res.statusCode=403;
res.send('PUT operation not supported on Promotions' );
})
.delete((req, res, next) => {
    _Promos.remove({})
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    _Promos.findById(req.params.promoId)
    .then( (promo) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    res.statusCode=403;
    res.send('POST operation not supported on /promotions/'+req.params.promoId );
})
.put( (req, res, next) => {
    _Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body  
    }, {new: true} )
    .then( (promo) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    _Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports  = promoRouter;
/*
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
*/
