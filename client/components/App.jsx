import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import CreatePost from "./CreatePost.jsx";
import Profile from "./Profile.jsx";
import NavBar from "./NavBar.jsx";

import AlertContext from "./context/AlertContext.js";

const App = () => {
  const [userInfo, setUserInfo] = useState("");
  const [alert, setAlert] = useState([])

  const verifySession = async () => {
    const res = await fetch("/currentSession");
    if (res.status == 500) return setAlert(alerts => [...alerts, { severity: 'error', message: 'Uh oh... the server is currently down :(' }])

    const hasSession = await res.json();
    if (hasSession) setUserInfo(hasSession);
  };

  const handleDismiss = (i) => {
    setAlert(prev => [...prev.slice(0,i), ...prev.slice(i+1)])
  }

  useEffect(() => {
    verifySession();
  }, []);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {(userInfo == "" ) ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<Login setUserInfo={setUserInfo} />} />
            <Route
              path="/signup"
              element={<Signup setUserInfo={setUserInfo} />}
            />
          </Routes>
        </Router>
      ) : (
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
      )}
      <Stack sx={{ position: 'fixed', bottom: '12px', left: '12px', zIndex: 10, width: 'auto', maxWidth: '400px' }} spacing={1}>
        {alert.map((element, i) => (
          <Alert 
            key={i} 
            severity={element.severity} 
            onClose={() => handleDismiss(i)}
            sx={{ boxShadow: '0px 4px 12px rgba(115, 115, 115, 0.5)' }}>
            <AlertTitle>{element.severity.charAt(0).toUpperCase() + element.severity.slice(1)}</AlertTitle>
            {element.message}
          </Alert>
        ))}
      </Stack>
    </AlertContext.Provider>
  );
};

export default App;
