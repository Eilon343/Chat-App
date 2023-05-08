import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import "./css/chat.css";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

// This component represents the main Chat interface.
const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isCurrentUserLoaded, setIsCurrentUserLoaded] = useState(false);

  const navigate = useNavigate();

  // The useEffect hook is used to fetch the current user data from the localStorage.
  useEffect(() => {
    async function fetchCurrentUser() {
      // Check if the user is not logged in.
      if (!localStorage.getItem("chat-app-user")) {
        // If the user is not logged in, navigate to the login page.
        navigate("/login");
      } else {
        // If the user is logged in, set the current user state to the parsed user data from the localStorage.
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsCurrentUserLoaded(true);
      }
    }
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // The useEffect hook is used to fetch all the users and set them to the contacts list.
  useEffect(() => {
    async function fetchAllUsers() {
      if (currentUser) {
        // If the current user has set their avatar image, fetch all users from the server using the axios HTTP client.
        if (currentUser.isAvatarImageSet) {
          console.log(currentUser.isAvatarImageSet);
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          // If the current user has not set their avatar image, navigate to the setAvatar route.
          navigate("/setAvatar");
        }
      }
    }
    if (isCurrentUserLoaded) {
      fetchAllUsers();
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="container">
      <div className="chat">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome
            currentUser={currentUser}
            isCurrentUserLoaded={isCurrentUserLoaded}
          />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
