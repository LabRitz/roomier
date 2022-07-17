import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Routes } from 'react-router-dom';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import CreatePost from './CreatePost.jsx';
import Profile from './Profile.jsx';


const App = (props) => {

  return (
    <Router>
      <Switch>
      
        <Route exact path='/' component={Profile} />
        <Route path='/signup' component={Signup}/>
        <Route path='/home' component={Home}/>
        <Route path='/createPost' component={CreatePost}/>
        <Route path='/profile' component={Profile}/>

      </Switch>
    </Router>
  )

  // return (
  //   <Router>
  //     <Routes>
      
  //       <Route path='/' element={<Login/>} />
  //       <Route path='/signup' element={<Signup/>}/>
  //       <Route path='/home' element={<Home/>}/>
  //       <Route path='/createPost' element={<CreatePost/>}/>
  //       <Route path='/profile' element={<Profile/>}/>

  //     </Routes>
  //   </Router>
  // )

}

export default App;

