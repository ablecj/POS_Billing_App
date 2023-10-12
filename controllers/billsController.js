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
        console.log(Bills,"bills loging")
        res.status(200).send({ message: "get item successfully!", bills: Bills });

    } catch (error) {
        console.log("error",error);
    }
};




module.exports = {addBillsController, getBillsController}