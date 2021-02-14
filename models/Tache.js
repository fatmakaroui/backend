const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const tacheSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        
    },
     email: {
        type: String,
        required: true,
        
    },
    cin: {
        type: Number,
        required: true,
        min: 0,  
    },
    numero: {
        type: Number,
        required: true,
        min: 0
    },
    
    description: {
        type: String,
        required: true,
    },
    etat:{
        type:{
            type:String,
            default:'non consulté',
        },
        commentaire:{
            type:String,
            default:'',
        }
        
    },
    localisation:{
        latitude:  {
            type: Number,
            default:36.853879,
          
        },
        longitude:  {
            type: Number,
            default:10.120,
    
        },
    },
    date: {
        type: Date,
		default:Date.now,
    },
    emailTech: {
        type :String,
        default:'not defined'
    },
    idRec:{
        type:String,
    }
});


mongoose.model('Tache',tacheSchema);