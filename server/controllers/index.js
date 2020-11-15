let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveys = require('../models/survey');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
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

    surveys.create(newSurvey, (err, book) => {
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