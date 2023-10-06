const express = require('express');
const { getItemController, addItemController,editItemController,deleteItemConteroller} = require('../controllers/itemControllers');

const router = express.Router();


// routes

// Method-get
router.get('/get-item',getItemController);

// Method post
router.post('/add-item', addItemController);

// method PUT for editing the data
router.put('/edit-item', editItemController);

// method DELETE 
router.delete('/delete-item', deleteItemConteroller);

module.exports = router;