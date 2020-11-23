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

/* GET MY SURVEYS page. */
router.get('/mysurveys', indexController.displayMySurveysPage);

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

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform User Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
