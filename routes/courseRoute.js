const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddileware = require('../middelwares/roleMiddleware');
const loginMiddleware = require("../middelwares/loginMiddleware");

const router = express.Router();

router.route('/').post(loginMiddleware.authenticatetoken,roleMiddileware(["teacher","admin"]),courseController.createCourse);
router.route('/').get(loginMiddleware.authenticatetoken,courseController.getAllCourse);
router.route('/:slug').get(loginMiddleware.authenticatetoken,courseController.getCourse);
router.route('/:slug').delete(loginMiddleware.authenticatetoken,courseController.deleteCourse);
router.route('/:slug').put(loginMiddleware.authenticatetoken,courseController.updateCourse);
router.route('/enroll').post(loginMiddleware.authenticatetoken,courseController.enrollCourse);
router.route('/release').post(loginMiddleware.authenticatetoken,courseController.releaseCourse);

module.exports = router;
