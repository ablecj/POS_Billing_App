const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require('./config/config.js');
const router = require("./Routes/itemRoute.js");


// dotenv config
dotenv.config();

// MongoDb calling
connectDb(); 

// REST object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// get routes
app.use('/api/items', require('./Routes/itemRoute.js'));

// post
app.use('/api/items', require('./Routes/itemRoute.js'));

// port
const PORT = process.env.PORT || 8080;

// litsen
app.listen(PORT, () => {
  console.log(`server started sucessfully ${PORT}`);
});
