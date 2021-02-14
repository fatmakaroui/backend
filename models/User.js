const mongoose = require('mongoose');
const bcrypt = require('bcrypt') 


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    cin:{
        type: Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"non vérifier"

    }
    ,
    localisation:{
        latitude:  {
            type: Number,
            default:36.853879,
          
        },
        longitude:  {
            type: Number,
            default:10.120,
    
        }
    }
})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}

mongoose.model('User',userSchema);