import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './styles.css'

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
          <div className="md:container md:mx-auto">
            <MenuBar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </div>
      </Router>
    </AuthProvider>
  );
}

export default App;