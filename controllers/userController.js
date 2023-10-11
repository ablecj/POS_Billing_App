const userModel = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    console.log(req.body);
    const user = await userModel
      .findOne({ userId, password, verified: true })
      .exec();
    console.log(user, "user");
    if (user) {
      res.status(200).send(user);
    } else {
      res.json({
        message: "Login Failed !",
        user,
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

    // If the username is not taken, create and save the new user
    const newUser = new userModel({ name, userId, password, verified: true });
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
