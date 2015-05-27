import React from 'react'
import { Route, DefaultRoute } from 'react-router'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'

export default (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
    <Route name="home" path="/" handler={Home}/>
    <Route name="about" handler={About}/>
  </Route>
);
