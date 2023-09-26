const mongoose = require("mongoose");
const dotenv = require('dotenv');
const connectDb = require('./config/config.js');
const itemModel = require('./models/itemModel.js');
const dataItems = require('./utils/data.js');

// config
dotenv.config();
connectDb();

// function seeder
const importData = async ()=>{
    try {
        await itemModel.deleteMany();
        const itemData = await itemModel.insertMany(dataItems);
        console.log("all items added");
        process.exit();
    } catch (error) {
        console.log("error", error);
        process.exit(1);
    }
}

importData();