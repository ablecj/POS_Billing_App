const express = require('express');
const { getItemController, addItemController} = require('../controllers/itemControllers');

const router = express.Router();


// routes

// Method-get
router.get('/get-item',getItemController);

// Method post
router.post('/add-item', addItemController);

module.exports = router;