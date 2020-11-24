let mongoose = require('mongoose');

let SurveyQuestion = mongoose.Schema
(
    {
        surveyID:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Survey'
        },  
        question:
        {
            type: String,
            default: '',
            trim: true
        },
        questionType:
        {
            type: String,
            enum: ['shortAnswer', 'multipleChoice'],
            default: 'shortAnswer'
        }
    },

    {
        collection: "surveyQuestions"
    }
);

module.exports = mongoose.model('SurveyQuestion', SurveyQuestion);