import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './screen/HomePage/index';
import AdminDashboard from './components/AdminListItem';
import UserDashboard from './components/UserListItem';
import UserProfile from './screen/UserProfile';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const firebaseConfig = {
  apiKey: "AIzaSyBNA9OznXwIJt88-bFs3mqXoiz59HPJHUA",
  authDomain: "ecoisland-1a35b.firebaseapp.com",
  projectId: "ecoisland-1a35b",
  storageBucket: "ecoisland-1a35b.appspot.com",
  messagingSenderId: "265116055269",
  appId: "1:265116055269:web:e3355eb3287a85cdffc60c",
  measurementId: "G-LQ8JGWLXQ0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <ThemeProvider theme={theme}>

      <Router>
        <div className="App">
          <ToastContainer />

        </div>

        <Route path="/" exact component={HomePage} />
        {isLoggedIn ? (
          <>
            <Route path="/UserDashboard" component={UserDashboard} />
            <Route path="/UserProfile" component={UserProfile} />
          </>
        ) : (
          <Route path="/" exact component={HomePage} />
        )}
        {isLoggedIn && <Route path="/AdminDashboard" component={AdminDashboard} />}
      </Router>
    </ThemeProvider>

  );


}

export default App;
