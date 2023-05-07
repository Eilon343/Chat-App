import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import "./css/ChatInput.css";

// This component is a form for users to enter and send chat messages
const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  // This function toggles the 'showEmojiPicker' state variable
  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // This function is called when an emoji is clicked in the emoji picker
  // It concatenates the selected emoji to the 'msg' state variable
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  // This function is called when the send button is clicked
  // It prevents the default form submission behavior and checks if 'msg' is not empty
  // If 'msg' is not empty, it calls the 'handleSendMsg' function with the 'msg' argument and resets the 'msg' state variable
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="Container">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && (
            <Picker emojiStyle="twitter" onEmojiClick={handleEmojiClick} />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
