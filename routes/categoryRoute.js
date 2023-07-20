const express = require('express');
const categoryController = require('../controllers/categoryController');
const loginMiddleware = require("../middelwares/loginMiddleware");

const router = express.Router();

router.route('/').post(loginMiddleware.authenticatetoken,categoryController.createCategory);
router.route('/:id').delete(loginMiddleware.authenticatetoken,categoryController.deleteCategory);
module.exports = router;
