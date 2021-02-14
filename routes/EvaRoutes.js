const express = require('express')
const mongoose = require('mongoose')

var evaRouter = express.Router();
const Evas = mongoose.model('Eva');


const bodyParser = require('body-parser');

evaRouter.use(bodyParser.json());

evaRouter.route('/')
.get((req,res,next) => {
    Evas.find({})
    .then((evas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(evas);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Evas.create(req.body)
    .then((eva) => {
        console.log('Eva Created ', eva);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(eva);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /evas');
})
.delete((req, res, next) => {
    Evas.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

evaRouter.route('/:evaId')
.get((req,res,next) => {
    Evas.findById(req.params.evaId)
    .then((eva) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(eva);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /evas/'+ req.params.evaId);
})
.put((req, res, next) => {
    Evas.findByIdAndUpdate(req.params.evaId, {
        $set: req.body
    }, { new: true })
    .then((eva) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(eva);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Evas.findByIdAndRemove(req.params.evaId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = evaRouter;


