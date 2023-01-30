import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login.jsx";
const Signup = lazy(() => import("./Signup.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const CreatePost = lazy(() => import("./CreatePost.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));
const NavBar = lazy(() => import("./NavBar.jsx"));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route
            path="/signup"
            element={<Signup setUserInfo={setUserInfo} />}
          />
        </Routes>
      </Router>
    </Suspense>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route exact path="/" element={<Home userInfo={userInfo} />} />
          <Route
            path="/createPost"
            element={<CreatePost userInfo={userInfo} />}
          />
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
