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
       question:
       {
        type: String,
        default: '',
        trim: true
       },
       surveyType:
       {
        type: String,
        enum: ['shortAnswer', 'multipleChoice'],
        default: 'shortAnswer'
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

module.exports.Survey = mongoose.model('Survey', Survey);