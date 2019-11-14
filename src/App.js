import React from 'react';
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/blog/:slug" component={BlogPage}></Route>
      <Footer />
    </Router>
  );
}

export default App;
