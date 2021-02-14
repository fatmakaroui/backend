const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const pubSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: 
    { 
        type: String, 
        required: true,
    },
    date: {
        type: Date,
		default:Date.now,
    }
});


mongoose.model('Pub',pubSchema);