import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Routes } from 'react-router-dom';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import CreatePost from './CreatePost.jsx';
import Profile from './Profile.jsx';


const App = (props) => {

  const [userInfo, setUserInfo] = useState('');
  return (
    (userInfo == '') ? (
      <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login setUserInfo={setUserInfo}/>} />
          <Route path='/signup' element={<Signup setUserInfo={setUserInfo}/>}/>
        </Routes>
      </Router>
      </>
      ) :(
      <Router>
        <Routes>

          <Route exact path='/' element={<Home userInfo={userInfo}/>}/>
          <Route path='/createPost' element={<CreatePost userInfo={userInfo}/>}/>
          <Route path='/profile' element={<Profile userInfo={userInfo}/>}/>

        </Routes>
      </Router>
    )
  )

}

export default App;

