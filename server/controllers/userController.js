// Import the necessary modules
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Function to handle user registration
module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      // Return an error response if the username is already in use
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      // Return an error response if the email is already in use
      return res.json({ msg: "Email already used", status: false });
    }
    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user with the email, username, and hashed password
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // Remove the password from the user object before sending it in the response
    delete user.password;
    // Return a success response with the user object
    return res.json({ status: true, user });
  } catch (ex) {
    // Call the next middleware with the error message if an exception occurs
    next(ex.message, "here");
  }
};

// Function to handle user login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      // Return an error response if the user doesn't exist
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Return an error response if the password is incorrect
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    // Remove the password from the user object before sending it in the response
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex.message, "here");
  }
};

// This function sets the avatar image for a user by their user ID.
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Updates the user's data in the database with the new avatar image.
    const userData = await User.findByIdAndUpdate(userId, {
      isAvaterImageSet: true,
      avatarImage,
    });

    // Returns a JSON response indicating whether the image was set and the URL of the image.
    return res.json({
      isSet: userData.isAvaterImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

// This function retrieves all the users in the database except for the user with the specified ID.
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // Finds all the users except for the one with the specified ID, and returns only the email, username, avatarImage, and _id fields.
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    // Returns a JSON response containing an array of user objects.
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
