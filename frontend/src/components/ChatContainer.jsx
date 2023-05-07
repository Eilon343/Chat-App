import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getMessagesRoute } from "../utils/APIRoutes";
import "./css/ChatContainer.css";

// This component represents the container for the chat window
const ChatContainer = ({ currentChat, currentUser }) => {
  // Define a state variable to hold the messages and initialize it to an empty array
  const [messages, setMessages] = useState([]);

  // Use the useEffect hook to fetch messages from the server when the current chat changes
  useEffect(() => {
    async function getMessages() {
      // Make a POST request to the server to get messages for the current chat
      const response = await axios.post(getMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [currentChat]);

  // Define a function to handle sending messages
  const handleSendMsg = async (msg) => {
    // Make a POST request to the server to send a message
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
