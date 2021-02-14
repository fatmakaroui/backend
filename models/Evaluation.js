const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const evaSchema = new mongoose.Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
       
    },
    date: {
        type: Date,
		default:Date.now,
    },
    author: {
        type: String,
    }
});


mongoose.model('Eva',evaSchema);