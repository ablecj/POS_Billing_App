const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true, // This enforces a unique index
      },
    password: {
        type:String,
        required:true
    },
    verified:{
        type:Boolean
    }
},
{timestamps:true}
);

const User = mongoose.model("users",userSchema);
module.exports = User;