let mongoose = require('mongoose');

let ShortAnswer = mongoose.Schema
(
    {
        surveyID:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Survey'
        },
        response:
        {
            type: String,
            default: '',
            trim: true
        }
    },

    {
        collection: "shortAnswerResponses"
    }
);

module.exports = mongoose.model('ShortAnswer', ShortAnswer);