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

router.get('/surveys/update/:id', indexController.displaySurveyUpdatePage);

router.post('/surveys/update/:id', indexController.processSurveyUpdate);

// GET publish survey
router.get('/surveys/publish/:id', indexController.processSurveyPublish);

// GET survey question CREATE page
router.get('/surveys/update/addquestion/:id', indexController.displayQuestionCreatePage);

router.post('/surveys/update/addquestion/:id', indexController.processQuestionCreatePage);

// GET Create new multiple choice question
router.get('/surveys/update/addmultiplechoice/:id', indexController.processCreateMultipleChoiceQuestion);

router.get('/surveys/update/question/addoption/:questionID', indexController.processAddMultipleChoiceOption);

router.get('/surveys/update/question/option/:optionID');

// update survey question
router.get('/surveys/update/question/:questionID', indexController.displayQuestionUpdatePage);

router.post('/surveys/update/question/:questionID', indexController.processQuestionUpdatePage);

// GET delete survey question
router.get('/surveys/update/question/delete/:questionID', indexController.processDeleteQuestion);

// short answer survey response
router.get('/surveys/respond/:id', indexController.displaySurveyRespondPage);

router.post('/surveys/respond/:id', indexController.processSurveyRespondPage);

// view survey responses
router.get('/surveys/:id', indexController.displaySurveyDataPage);

// view survey question responses
router.get('/surveys/question/:id', indexController.displayQuestionDataPage);

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
