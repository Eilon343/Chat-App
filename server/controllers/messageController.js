// Import the message model for database operations
const messageModel = require("../models/messageModel");

// Function for adding a message to the database
module.exports.addMessage = async (req, res, next) => {
  try {
    // Extract the necessary data from the request body
    const { from, to, message } = req.body;
    // Create a new message in the database with the extracted data
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    // If the message was added successfully, return a success response
    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    // If there was an error, pass it to the error handling middleware
    next(ex);
  }
};

// Function for retrieving all messages between two users from the database
module.exports.getAllMessages = async (req, res, next) => {
  try {
    // Extract the necessary data from the request body
    const { from, to } = req.body;
    // Find all messages between the two users and sort them by update time in ascending order
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    // Project the relevant data for each message and return it as a response
    const projectedMessages = await messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectedMessages);
  } catch (ex) {
    // If there was an error, pass it to the error handling middleware
    next(ex);
  }
};
