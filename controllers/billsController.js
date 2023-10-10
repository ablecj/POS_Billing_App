const billsModels = require('../models/billsModels.js');




// add items
const addBillsController = async(req, res)=>{
    try {
        const newBill = new billsModels(req.body);
        await newBill.save();
        res.send("Bill created sucessfuly");
    } catch (error) {
        res.send(error);
        console.log("error",error);
    }
};

// get bill controller
const getBillsController =  async(req,res)=> {
    try {
        const Bills = await billsModels.find();
        res.status(200).send("get item succesfully !");
    } catch (error) {
        console.log("error",error);
    }
};




module.exports = {addBillsController, getBillsController}