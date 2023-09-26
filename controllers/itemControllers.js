const itemModel = require('../models/itemModel.js');


 const getItemController =  async(req,res)=> {
    try {
        const items = await itemModel.find();
        res.status(200).send(items);
    } catch (error) {
        console.log("error",error);
    }
};

// add items
const addItemController = async(req, res)=>{
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(201).send("Item created sucessfuly");
    } catch (error) {
        res.status(400).send("error",error);
        console.log("error",error);
    }
};

module.exports = {getItemController,addItemController}