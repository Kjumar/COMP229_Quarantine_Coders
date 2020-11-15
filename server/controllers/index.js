let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveys = require('../models/survey');
let shortAnswers = require('../models/shortAnswer');

module.exports.displayHomePage = (req, res, next) => {
    // we should cull the number of surveys that show up on this page, but for now I'm listing all of them
    surveys.find((err, surveys) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index', {
                title: 'Home',
                displayName: req.user ? req.user.displayName : '',
                surveys: surveys
            });
        }
    });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : ''}); 
}

// Get surveys/update to add a new survey
module.exports.displaySurveyCreatePage = (req, res, next) => {
    res.render('surveys/update', {
        title: 'Create Survey',
        displayName: req.user ? req.user.displayName : '',
        survey: ''
    }); 
}

// POST process the surveys/update page to add a new ShortAnswer survey
module.exports.processCreateShortAnswerSurvey = (req, res, next) => {
    let newSurvey = surveys({
        'creator': 'Admin', // for now, since we don't have authentication yet
        'question': req.body.question,
        'surveyType': 'shortAnswer',
        'expires': req.body.expiryDate
    });

    surveys.create(newSurvey, (err, survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/')
        }
    });
}

// GET survey response page and respond to a survey
module.exports.displaySurveyRespondPage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, survey) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            res.render('surveys/respond', {
                title: 'Respond to Survey',
                displayName: req.user ? req.user.displayName : '',
                survey: survey
            });
        }
    });
}

module.exports.processSurveyRespondPage = (req, res, next) => {
    let id = req.params.id;

    let newResponse = shortAnswers({
        'surveyID': id,
        'response': req.body.response
    });

    shortAnswers.create(newResponse, (err, shortAnswer) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/'); // should redirect to a page that confirms to the use that their response has been recorded
        }
    })
}

module.exports.displaySurveyDataPage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, survey) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            shortAnswers.find({surveyID: id}, (err, shortAnswer) => {
                if (err)
                {
                    return console.log(err);
                }
                else
                {
                    res.render('surveys/view', {
                        title: 'Respond to Survey',
                        displayName: req.user ? req.user.displayName : '',
                        survey: survey,
                        responses: shortAnswer
                    });
                }
            });
        }
    });
}