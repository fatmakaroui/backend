const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const recSchema = new mongoose.Schema({
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
        min: 0,
        unique:false,
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
    localisation:{
        latitude:  {
            type: Number,
            default:36.853879,
          
        },
        longitude:  {
            type: Number,
            default:10.120,
    
        }
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
    date: {
        type: Date,
		default:Date.now,
    }
});


mongoose.model('Rec',recSchema);