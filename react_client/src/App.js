import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Home from './views/public/details';
import Login from './views/public/login'
class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
      </>
    );
  }
}
export default App;