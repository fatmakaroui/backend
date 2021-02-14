const express = require('express')
const mongoose = require('mongoose')

var tacheRouter = express.Router();
const Taches = mongoose.model('Tache');


const bodyParser = require('body-parser');

tacheRouter.use(bodyParser.json());

tacheRouter.route('/')
.get((req,res,next) => {
    Taches.find({})
    .then((taches) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(taches);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Taches.create(req.body)
    .then((tache) => {
        console.log('Tache Created ', tache);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tache);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /taches');
})
.delete((req, res, next) => {
    Taches.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

tacheRouter.route('/:tacheId')
.get((req,res,next) => {
    Taches.findById(req.params.tacheId)
    .then((tache) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tache);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /taches/'+ req.params.tacheId);
})
.put((req, res, next) => {
    Taches.findByIdAndUpdate(req.params.tacheId, {
        $set: req.body
    }, { new: true })
    .then((tache) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tache);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Taches.findByIdAndRemove(req.params.tacheId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
tacheRouter.route('/rechTech/:TechEmail')
.get((req,res,next) => {
    Taches.find({"emailTech":req.params.TechEmail})
    .then((taches) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(taches);
    }, (err) => next(err))
    .catch((err) => next(err));
})

tacheRouter.route('/chart/:Etat')
.get((req,res,next) => {
    Taches.etat.find({"type":req.params.Etat})
    .then((taches) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(taches);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = tacheRouter;
