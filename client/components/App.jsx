import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";

import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import CreatePost from "./CreatePost.jsx";
import Profile from "./Profile.jsx";
import NavBar from "./NavBar.jsx";

const App = () => {
  const [userInfo, setUserInfo] = useState("");

  const verifySession = async () => {
    const res = await fetch("/currentSession");
    const hasSession = await res.json();

    if (hasSession) setUserInfo(hasSession);
    else console.log("User does not have current session");
  };

  useEffect(() => {
    verifySession();
  }, []);

  return userInfo == "" ? (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route
            path="/signup"
            element={<Signup setUserInfo={setUserInfo} />}
          />
        </Routes>
      </Router>
    </>
  ) : (
    <>
      <Router>
        <NavBar setUserInfo={setUserInfo} />
        <Routes>
          <Route exact path="/" element={<Home userInfo={userInfo} />} />
          <Route
            path="/createPost"
            element={<CreatePost userInfo={userInfo} />}
          />
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
