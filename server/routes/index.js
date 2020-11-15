let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET  HOME page. */
router.get('/', indexController.displayHomePage);

/* GET  HOME page. */
router.get('/home', indexController.displayHomePage);

/* GET ABOUT US page. */
router.get('/about', indexController.displayAboutPage);

/* GET CONTACT US page. */
router.get('/contact', indexController.displayContactPage);

// short answer survey creation
router.get('/surveys/create', indexController.displaySurveyCreatePage);

router.post('/surveys/create', indexController.processCreateShortAnswerSurvey);

// short answer survey response
router.get('/surveys/respond/:id', indexController.displaySurveyRespondPage);

router.post('/surveys/respond/:id', indexController.processSurveyRespondPage);

// view survey responses
router.get('/surveys/:id', indexController.displaySurveyDataPage);

// POST delete survey (and all its answers)
router.get('/surveys/delete/:id', indexController.processDeleteSurvey);

module.exports = router;
