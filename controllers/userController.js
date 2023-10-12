const userModel = require("../models/userModel.js");

const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust the number of salt rounds based on your security needs



const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({ userId, verified: true }).exec();

    if (user) {
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).send(user);
      } else {
        res.status(401).json({
          message: "Login Failed: Invalid password!",
          user: null,
        });
      }
    } else {
      res.status(401).json({
        message: "Login Failed: User not found or not verified!",
        user: null,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};


// add items
// const registerController = async (req, res) => {
//   try {
//     const newUser = new userModel({ ...req.body, verified: true });
//     console.log(newUser, "new user");
//     await newUser.save();
//     res.status(201).send("User Registered sucessfuly !");
//   } catch (error) {
//     res.status(400).send(error);
//     console.log("error", error);
//   }
// };



const registerController = async (req, res) => {
  const { userId, password, name } = req.body;

  try {
    // Validate that userId is not empty
    if (!userId) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Check if the username is already taken
    const existingUser = await userModel.findOne({ userId });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // If the username is not taken, create and save the new user with the hashed password
    const newUser = new userModel({ name, userId, password: hashedPassword, verified: true });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error, "register error");
    // Handle any potential errors when saving the user
    return res.status(500).json({ message: "An error occurred while registering the user" });
  }
};



// const registerController = async(req,res)=>{
//   userModel.create(req.body)
//   .then(user => res.json(user))
//   .catch(err => res.json(err))
// }


module.exports = { loginController, registerController };
