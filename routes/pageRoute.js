const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware=require('../middelwares/redirectMiddleware');
const loginMiddleware=require('../middelwares/loginMiddleware');
const router = express.Router();

router.route('/').get(loginMiddleware.authenticatetoken,pageController.getIndexPage);
router.route('/about').get(loginMiddleware.authenticatetoken,pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
router.route('/contact').post(pageController.sendMail);
module.exports = router;
