import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// import Login from './Login.jsx';
// import Signup from './Signup.jsx';
import Home from './Home.jsx';
import CreatePost from './CreatePost.jsx';
import Profile from './Profile.jsx';

const App = (props) => {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route path='/signup' component={Signup}/> */}
        <Route path='/home' component={Home} />
        <Route path='/createPost' component={CreatePost} />
        <Route path='/profile' component={Profile} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )

}

export default App;