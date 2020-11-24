let mongoose = require('mongoose');

let Survey = mongoose.Schema
(
    {
        creator:
        {
            type: String,
            default: '',
            trim: true
        },    
        title:
        {
            type: String,
            default: '',
            trim: true
        },
        created:
        {
            type: Date,
            default: Date.now,
        },
        expires:
        {
            type: Date,
            default: Date.now
        }
    },

    {
        collection: "surveys"
    }
);

module.exports = mongoose.model('Survey', Survey);