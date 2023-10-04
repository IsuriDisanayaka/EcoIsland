import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import logo from "../../assets/img/logo.png";
import homepic from "../../assets/img/homepage.png";
import closeIcon from "../../assets/img/close.png";
import lgif from "../../assets/gif/giphy.gif";
import closewhiteIcon from "../../assets/img/closewhiteIcon .png";



import "./style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#535c68",
    },
  },
});


export default function HomePage() {
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterpassword, setReEnterPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleGettingStartedClick = () => {
    document.querySelector(".overlay").classList.remove("show");

    setShowPopup(true);
  };




  const handleSignUpClick = () => {
    document.querySelector(".overlay").classList.remove("show");

    setSignUpClicked(true);
    setSignInClicked(false);
  };

  const handleSignInClick = () => {
    document.querySelector(".overlay").classList.remove("show");

    setSignUpClicked(false);
    setSignInClicked(true);
  };


  function clearTextUser() {
    setFristName("");
    setLastName("");
    setContact("");
    setAddress("");
    setEmail("");
    setNic("");
    setDateOfBirth("");
    setGender("");
    setPassword("");
    setReEnterPassword("");
  }


  const handleSignUpButtonClick = () => {
    handleSignUpClick();
    toggleSignInPopup(true);

  };
  const handleSignInButtonClick = () => {
    handleSignInClick();
    togglePopup(true);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const toggleSignInPopup = () => {
    setShowSignInPopup(!showSignInPopup);
  };
  const handleSaveUser = (event) => {
    console.log("Save button clicked");
    event.preventDefault();
    if (!fristName || !lastName || !address || !contact || !email || !nic || !dateOfBirth || !gender || !password || !reEnterpassword) {
      alert('Please fill out all required fields.');

      return;
    }
    if (password !== reEnterpassword) {
      alert('Passwords do not match.');

      return;

    }
    const data = {
      fristName,
      lastName,
      contact,
      address,
      email,
      nic,
      dateOfBirth,
      gender,
      password,
    };

    axios.post('http://localhost:8080/api/v1/user', data)
      .then(response => {
        console.log('Successfully saved customer:', response.data);
        alert('successfully! Please ,Check your email and verify email');

        clearTextUser();
        setIsRegistered(true);
      })
      .catch(error => {
        console.error('Error saving:', error);
        alert('An error occurred. Please try again later.');

      });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/${email}/${password}`);

      if (response.status === 200) {
        alert("Login successful");
        // You can redirect to another page or take other actions here
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <AppBar position="static" className="appBar">
          <Toolbar>
            <img className="logo" src={logo} alt="" />
            <div className="button-container">
              <Button
                variant="contained"
                className={`button ${signInClicked ? "clicked" : ""}`}
                onClick={handleSignInButtonClick}
              >
                Sign Up
              </Button>

              {showSignInPopup && (
                <div className="overlay">
                  <div className="popup">
                    <img src={closewhiteIcon} className="close-button" alt="" onClick={() => setShowSignInPopup(false)} />
                    <h1 style={{ color: " #ffff" }}>Sign In</h1>

                    <input
                      type="string"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      type="string"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="forgot-password-button"
                    >forgot password</Button>
                    <img style={{
                      width: "200px", height: "152px", position: "relative",
                      left: "168px", top: "36px"
                    }} className="lgif" src={lgif} alt="" />


                    <button className="loginButton" onClick={handleLogin}>Login</button>

                  </div>
                </div>
              )}

              <Button variant="contained" className={`button ${signUpClicked ? "clicked" : ""}`} onClick={handleSignUpButtonClick} >  Sign In </Button>
              {showPopup && (
                <div className="overlay">
                  <div className="popupsignup">
                    <img src={closeIcon} className="close-button_signUp" alt="" onClick={() => setShowPopup(false)} />
                    <h1 style={{ color: "#1d5507" }}>Sign Up</h1>
                    <div className="input-row">
                      <div className="input-column">
                        <input type="text" placeholder="First Name" value={fristName} onChange={(e) => setFristName(e.target.value)} />
                        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                      </div>
                      <div className="input-column">
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="NIC Number" value={nic} onChange={(e) => setNic(e.target.value)} />
                        <DatePicker style={{ width: "100%" }} placeholderText="Date Of Birth"
                          selected={dateOfBirth}
                          onChange={(date) => setDateOfBirth(date)}
                          minDate={new Date("1920-01-01")}
                          maxDate={new Date("2016-12-31")}
                        />

                        <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                        <input type="text" placeholder="Re-Enter Password" value={reEnterpassword} onChange={(e) => setReEnterPassword(e.target.value)} />
                      </div>
                    </div>
                    <Button className="submit" onClick={handleSaveUser}>
                      Submit
                    </Button>

                    <div className="sign-in-button">
                      <h3> If you have already account: </h3>
                      <button onClick={handleSignInClick} className="sign-in-button-text">
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </Toolbar>
        </AppBar>
        <div className="content">

          <div className="image-wrapper">
            <img className="homeImg" src={homepic} alt="" />
            <div className="overlay">
              <div className="join-button-container" >
                <Button className="text" style={{
                  fontSize: '20px', fontWeight: 'bold', boxShadow: ' 0 0 10px 4px rgba(0, 0, 16, 0.5)',
                  color: 'black', backgroundColor: 'white', width: '350px', height: '50px', borderRadius: '5%'
                }} onClick={handleGettingStartedClick}
                >Getting Started  </Button>

              </div>
            </div>
          </div>

          <div>
            <p className="title_Eco">EcoIsland</p>
            <p className="mainParagraph">
              Discover a world of sustainable treasures and support local communities
            </p>
          </div>
        </div>

        <footer>
          <Box p={2} bgcolor="primary.main" color="primary.contrastText">
            <Typography className="footer" variant="body2">
              © 2023 EcoIsland. All Rights Reserved.
            </Typography>
          </Box>
        </footer>
      </div>
    </ThemeProvider>
  )
}
