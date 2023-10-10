const express = require('express');
const { addBillsController,getBillsController} = require('../controllers/billsController.js');

const router = express.Router();


// get routes
router.get('/get-bills', getBillsController);


// Method post
router.post('/add-bills', addBillsController);



module.exports = router;