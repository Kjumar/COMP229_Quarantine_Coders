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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
