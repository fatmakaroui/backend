const express = require('express')
const mongoose = require('mongoose')

var pubRouter = express.Router();
const Pubs = mongoose.model('Pub');
const multer=require('multer');

const storage=multer.diskStorage({
destination: function(req,file,cb){
    cb(null,'C:/Users/fatma/Downloads/react-native-login-template-master/src/screens/pubimages/');
},
filename: function(req, file , cb){
    cb(null,Date.now()+file.originalname)
}
});

const upload = multer({storage:storage})

const bodyParser = require('body-parser');

pubRouter.use(bodyParser.json());

pubRouter.route('/')
.get((req,res,next) => {
    Pubs.find({})
    .then((pubs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pubs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('img'),(req, res, next) => {
    console.log(req.file)
    req.body.img="./pubimages/"+req.file.filename
    Pubs.create(req.body)
    .then((pub) => {
        console.log('pub Created ', pub);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pub);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /pubs');
})
.delete((req, res, next) => {
    Pubs.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

pubRouter.route('/:pubId')
.get((req,res,next) => {
    Pubs.findById(req.params.dishId)
    .then((pub) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pub);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /pubs/'+ req.params.pubId);
})
.put((req, res, next) => {
    Pubs.findByIdAndUpdate(req.params.pubId, {
        $set: req.body
    }, { new: true })
    .then((pub) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(pub);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Pubs.findByIdAndRemove(req.params.pubId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = pubRouter;
