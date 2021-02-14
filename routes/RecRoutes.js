const express = require('express')
const mongoose = require('mongoose')

var recRouter = express.Router();
const Recs = mongoose.model('Rec');


const bodyParser = require('body-parser');

recRouter.use(bodyParser.json());

recRouter.route('/')
.get((req,res,next) => {
    Recs.find({})
    .then((recs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Recs.create(req.body)
    .then((rec) => {
        console.log('Reclamation Created ', rec);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rec);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recs');
})
.delete((req, res, next) => {
    Recs.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

recRouter.route('/:recId')
.get((req,res,next) => {
    Recs.findById(req.params.recId)
    .then((rec) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rec);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /recs/'+ req.params.recId);
})
.put((req, res, next) => {
    Recs.findByIdAndUpdate(req.params.recId, {
        $set: req.body
    }, { new: true })
    .then((rec) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(rec);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req, res, next) => {
    Recs.findByIdAndRemove(req.params.recId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

recRouter.route('/rech/:recEtat')
.get((req,res,next) => {
    Recs.find({"etat.type":req.params.recEtat})
    .then((recs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recs);
    }, (err) => next(err))
    .catch((err) => next(err));
})

recRouter.route('/rechE/:recEmail')
.get((req,res,next) => {
    Recs.find({"email":req.params.recEmail})
    .then((recs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recs);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = recRouter;
