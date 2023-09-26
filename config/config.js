const mongoose = require("mongoose");


// conecting mongoDB
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error, "error");
    process.exit(1);
  }
};

// export
module.exports = connectDb;