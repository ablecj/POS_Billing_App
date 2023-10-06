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

// edit item controller
const editItemController = async(req,res)=>{
    try {
        const {itemId} = req.body;
        await itemModel.findOneAndUpdate({_id: req.body.itemId }, req.body, {
            new: true,
        })
        res.status(201).send("Item Updated!")       
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}

// delete item conteroller from the item page
const deleteItemConteroller = async(req,res)=>{
    try {
        const {itemId} = req.query;
         await itemModel.findOneAndDelete({_id: itemId})
        res.status(200).send('Item Deleted Successfuly!')
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}

module.exports = {getItemController,addItemController,editItemController,deleteItemConteroller}