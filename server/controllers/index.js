let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let surveys = require('../models/survey');
let surveyQuestions = require('../models/surveyQuestion');
let shortAnswers = require('../models/shortAnswer');
let userModel = require('../models/user');
let User = userModel.User; //alias

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
    let newSurvey = surveys({
        'creator': 'Admin',
        'title': 'New Survey'
    });

    surveys.create(newSurvey, (err, newSurvey) => {
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.redirect('/surveys/update/'+newSurvey._id);
        }
    });
}

module.exports.displaySurveyUpdatePage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, survey) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            surveyQuestions.find({surveyID: survey._id}, (err, surveyQuestions) => {
                if (err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('surveys/updateSurvey', {
                        title: 'Create Survey',
                        displayName: req.user ? res.user.displayName : '',
                        survey: survey,
                        surveyQuestions: surveyQuestions
                    });
                }
            });
        }
    });
}

// POST process the surveys/update page to add a new  survey
module.exports.processSurveyUpdate = (req, res, next) => {
    let id = req.params.id;

    let newSurvey = surveys({
        '_id': id,
        'creator': 'Admin', // for now, since we don't have authentication yet
        'title': req.body.title,
        'expires': req.body.expiryDate
    });

    surveys.updateOne({_id: id}, newSurvey, (err, survey) => {
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

// GET survey question create page
module.exports.displayQuestionCreatePage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, survey) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            let newSurveyQuestion = surveyQuestions({
                surveyID: survey._id,
                question: 'Survey Question'
            });

            res.render('surveys/updateQuestion', {
                title: 'Ask a Question',
                displayName: req.user ? req.user.displayName: '',
                surveyQuestion: newSurveyQuestion
            });
        }
    });
}

module.exports.processQuestionCreatePage = (req, res, next) => {
    let id = req.params.id;

    surveys.findById(id, (err, survey) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            let newSurveyQuestion = surveyQuestions({
                surveyID: survey._id,
                question: req.body.question
            });

            surveyQuestions.create(newSurveyQuestion, (err, surveyQuestion) => {
                if (err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/surveys/update/'+id);
                }
            })
        }
    });
}

// GET survey question update page
module.exports.displayQuestionUpdatePage = (req, res, next) => {
    let questionID = req.params.questionID;

    surveyQuestions.findById(questionID, (err, surveyQuestion) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            res.render('surveys/updateQuestion', {
                title: 'Update Question',
                displayName: req.user ? req.user.displayName : '',
                surveyQuestion: surveyQuestion
            });
        }
    });
}

module.exports.processQuestionUpdatePage = (req, res, next) => {
    let questionID = req.params.questionID;

    surveyQuestions.findOneAndUpdate({_id: questionID}, {'question': req.body.question}, (err, surveyQuestion) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys/update/'+surveyQuestion.surveyID);
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

    // first check if the survey exists
    surveys.findById(id, (err, survey) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            // then find all answers belonging to that survey
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

module.exports.processDeleteSurvey = (req, res, next) => {
    let id = req.params.id;

    surveyQuestions.find({surveyID: id}, (err, surveyQuestion) => {
        if (err)
        {
            return console.log(err);
        }
        else if (surveyQuestions.count > 0)
        {
            for (var i = 0; i < surveyQuestion; i++)
            {
                // remove short answers belonging to the question
                shortAnswers.deleteMany({questionID: surveyQuestions[i]._id}, (err) => {
                    if (err)
                    {
                        console.log(err);
                        res.end(err);
                    }
                });

                // TODO: remove all multiple choice responses belonging to the quesiton
            }
        }
    });

    surveyQuestions.deleteMany({surveyID: id}, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            surveys.deleteOne({_id: id}, (err) => {
                if (err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/');
                }
            });
        }
    });
}

module.exports.processDeleteQuestion = (req, res, next) => {
    let id = req.params.questionID;

    surveyQuestions.findById(id, (err, surveyQuestion) => {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            let surveyID = surveyQuestion.surveyID;
            shortAnswers.deleteMany({questionID: surveyQuestion._id}, (err) => {
                if (err)
                {
                    return console.log(err);
                }
                else
                {
                    surveyQuestions.deleteOne({_id: surveyQuestion._id}, (err) => {
                        if (err)
                        {
                            return console.log(err);
                        }
                        else
                        {
                            res.redirect('/surveys/update/'+surveyID);
                        }
                    })
                }
            });
        }
    });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if logged in already
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {

        passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {   
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instanciate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no errors, then registration is succesfull

            // redirect and authenticate user

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}