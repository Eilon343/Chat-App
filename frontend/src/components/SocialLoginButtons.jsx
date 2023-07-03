import React from "react";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import "./css/SocialLoginButton.css";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { firebaseLoginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocialLoginButtons = () => {
  const navigate = useNavigate();
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };
  const firebaseLogin = async (loginType) => {
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      const email = userData.user.email
        ? userData.user.email
        : userData.user.providerData[0].email;
      const { data } = await axios.post(firebaseLoginRoute, { email });
      if (data.status) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      } else {
        navigate("/setusername");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="social-buttons-container">
      <button type="button" onClick={() => firebaseLogin("google")}>
        <BsGoogle />
      </button>
      <button type="button" onClick={() => firebaseLogin("facebook")}>
        <BsFacebook />
      </button>
      <button type="button" onClick={() => firebaseLogin("github")}>
        <BsGithub />
      </button>
    </div>
  );
};

export default SocialLoginButtons;
