const userController = require('../controller/user');
const express = require("express");
const router = express.Router();

router.post('/signup',userController.userSignUp)

router.post('/login',userController.userLogin)

module.exports = router
