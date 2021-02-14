const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');


router.post('/signup',async (req,res)=>{
   
    const {email,password,type,nom,prenom,cin} = req.body;
    try{
      const user = new User({email,password,type,nom,prenom,cin});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password 1"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password 2"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token,type:user.type})
    }catch(err){
        return res.status(422).send({error :"must provide email or password 3"})
    }
    


})


router.route('/:compteId').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.compteId, {
      $set: req.body
  }, { new: true })
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.route('/:compteId').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.compteId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});
router.route('/update/:email').put((req, res, next) => {
    User.findOneAndUpdate({email:req.params.email},{
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
  });


router.route('/Tech')
.get((req,res,next) => {
    User.find({"type":"Tech"})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.route('/Admin')
.get((req,res,next) => {
    User.find({"type":"Admin"})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})


router.route('/ClNV')
.get((req,res,next) => {
    User.find({"type":"non vérifier"})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.route('/ClV')
.get((req,res,next) => {
    User.find({"type":"Vérifier"})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.route('/GetClient/:Cemail')
.get((req,res,next) => {
    User.find({"email":req.params.Cemail})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = router