const express = require('express');
const { 
        loginController,
        registerController
      } = require('../controllers/userController.js');

const router = express.Router();


// routes

// Method-get
router.post('/login', loginController);

// Method post
router.post('/register', registerController);


module.exports = router;