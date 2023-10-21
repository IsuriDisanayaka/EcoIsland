import React, { useState, useEffect } from "react";
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
import Slideshow from "../Slideshow";
import { useTranslation } from 'react-i18next';
import LanguageDropdown from "../../components/LanguageDropdown";
import { GoogleLogin } from 'react-google-login';





import "./style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
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
  const [showPassword, setShowPassword] = useState(false);
  const [color, setColor] = useState("black");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [contactError, setContactError] = useState(false);


  const { t } = useTranslation();


  const clientId = "265116055269-i1cu737065l1jiidtqm1die776mcsn8n.apps.googleusercontent.com"



  const changeColor = (newColor) => {
    setColor(newColor);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGettingStartedClick = () => {
    document.querySelector(".overlay").classList.remove("show");

    setShowPopup(true);

  };

  const handleSignagainInClick = () => {
    setShowPopup(false);
    setShowSignInPopup(true)
  };
  const handleSignagainUpClick = () => {
    setShowPopup(true);
    setShowSignInPopup(false)
  };

  const handleSignUpClick = () => {
    document.querySelector(".overlay").classList.remove("show");

    setSignUpClicked(true);
    setSignInClicked(false);
  };

  const handleSignInClick = () => {
    document.querySelector(".overlay").classList.remove("show");
    setShowPopup(false);
    setSignUpClicked(false);

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
      toast.warning(t("Please fill out all required fields."), {
        autoClose: 3000,
      });
      return;
    }
    if (password !== reEnterpassword) {
      toast.warning(t("Passwords do not match."), {
        autoClose: 3000,
      });

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
        toast.success('successfully!', { autoClose: 3000 });

        toast.info(t("Please Check your email and verify email"), {
          autoClose: 4000,
        });
        clearTextUser();
        setIsRegistered(true);
      })
      .catch(error => {
        console.error('Error saving:', error);
        toast.error('An error occurred. Please try again later.', { autoClose: 3000 });

      });
  };
  const handleGoogleLoginSuccess = (response) => {
    console.log('Google Login Success', response);
    // window.location.href = '/UserDashboard/';

  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failed', error);
    // window.location.href = '/UserDashboard/';

  };


  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/${email}/${password}`);

      if (response.status === 200) {
        localStorage.setItem('loggedIn', true);

        toast.success("Login successful");
        const user = response.data.data;
        const role = user.role;
        if (response.data.data.role === 'user') {
          localStorage.setItem('userData', JSON.stringify(user));
          localStorage.setItem('loggedIn', true);
          const userData = JSON.parse(localStorage.getItem('userData'));

          localStorage.setItem('userRole', role);


          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('loggedIn', true);
          toast("Welcome" + userData.fristName, { autoClose: 3000 })
          window.location.href = '/UserDashboard/';

        } else if (response.data.data.role === 'admin') {
          localStorage.setItem('adminData', JSON.stringify(user));
          localStorage.setItem('loggedIn', true);
          const adminData = JSON.parse(localStorage.getItem('adminData'));

          localStorage.setItem('email', user.email);
          localStorage.setItem('password', user.password);
          toast("Welcome" + adminData.fristName, { autoClose: 3000 })

          window.location.href = '/AdminDashboard/';

        } else {
          toast.error("Login error: Invalid role.", { autoClose: 3000 });
        }
      } else {
        toast.warning('Please fill out all required fields.', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Please fill out all required fields.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <AppBar position="static" className="appBar">

          <Toolbar>
            <img className="logo" src={logo} alt="" />

            <LanguageDropdown />
            <div className="button-container">
              <Button
                variant="contained"
                className={`button ${signInClicked ? "clicked" : ""}`}
                onClick={handleSignInButtonClick}
              >
                {t('SignUp')}
              </Button>

              {showSignInPopup && (
                <div className="overlay">
                  <div className="sign_popup">
                    <img src={closeIcon} className="close-button" alt="" onClick={() => setShowSignInPopup(false)} />
                    <h1 style={{
                      color: "#1d5507", bottom: "61px",
                      position: "relative"
                    }}>{t('SignIn')}</h1>

                    <input
                      type="string"
                      placeholder={t("Email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />


                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t("Password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer', marginLeft: '374px', position: 'relative', bottom: '100px' }}


                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </span>

                    <Button className="forgot-password-button"
                    >{t("forgot password")}</Button>


                    <button className="loginButton" onClick={handleLogin}>{t('SignIn')}</button>

                    {/* <button className="custom-button">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_191_13499)">
                            <path
                              d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                              fill="#4285F4"
                            />
                            <path
                              d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                              fill="#34A853"
                            />
                            <path
                              d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                              fill="#EB4335"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_191_13499">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>{t("Sign in with Google")}
                    </button> */}
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Login with Google"
                      onSuccess={handleGoogleLoginSuccess}
                      onFailure={handleGoogleLoginFailure}
                      cookiePolicy={'single_host_origin'}
                    />

                    <div className="sign-up-button">

                      <h3> {t("Don’t have any account?: ")}</h3>

                      <button onClick={handleSignagainUpClick} className="sign-up-button-text">
                        {t('SignUp')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Button variant="contained" className={`button ${signUpClicked ? "clicked" : ""}`} onClick={handleSignUpButtonClick} >  {t("SignIn")} </Button>
              {showPopup && (
                <div className="overlay">
                  <div className="popupsignup">
                    <img src={closeIcon} className="close-button_signUp" alt="" onClick={() => setShowPopup(false)} />
                    <h1 style={{
                      color: "#1d5507",
                    }}> {t("SignUp")}</h1>
                    <div className="input-row">
                      <div className="input-column">
                        <input type="text" placeholder={t("First Name")}
                          value={fristName} onChange={(e) => {
                            const input = e.target.value;
                            const regex = /^[a-zA-Z]+$/;
                            if (regex.test(input) || input === '') {
                              setFristName(input);
                              setFirstNameError(false);
                            } else {
                              setFirstNameError(true);
                            }
                          }
                          }
                          error={firstNameError}
                          helperText={firstNameError ? 'Invalid character' : ''}
                        />


                        <input placeholder={t("Email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder={t("Address")} value={address} onChange={(e) => {


                          const input = e.target.value;
                          const regex = /^[a-zA-Z0-9./ ,]+$/; // regular expression for allowed characters
                          if (regex.test(input) || input === '') {
                            setAddress(input);
                            setAddressError(false);
                          } else {
                            setAddressError(true);
                          }
                        }}
                          error={addressError}
                          helperText={addressError ? 'Invalid character' : ''}
                        />
                        <input type="text" placeholder={t("Contact")} value={contact} onChange={(e) => {
                          const input = e.target.value;
                          const regex = /^\d{10,10}$|^\d{1,10}$/; // regular expression for allowed characters
                          if (input.length <= 11 && (regex.test(input) || input === '')) {
                            setContact(input);
                            setContactError(false);
                          } else {
                            setContactError(true);

                          }

                        }}
                          error={contactError}
                          helperText={contactError ? 'Invalid contact number' : ''}

                        />
                        <input type="text" placeholder={t("Password")} value={password} onChange={(e) => setPassword(e.target.value)} />

                      </div>
                      <div className="input-column">
                        <input type="text" placeholder={t("Last Name")}
                          value={lastName} onChange={(e) => {
                            const input = e.target.value;
                            const regex = /^[a-zA-Z]+$/
                            if (regex.test(input) || input === '') {
                              setLastName(input);
                              setLastNameError(false);
                            } else {
                              setLastNameError(true);
                            }
                          }
                          }
                          error={lastNameError}
                          helperText={lastNameError ? 'Invalid character' : ''}


                        />
                        <input type="text" placeholder={t("NIC Number")} value={nic} onChange={(e) => setNic(e.target.value)} />
                        <DatePicker className="datepicker " placeholderText={t("Date Of Birth")}
                          selected={dateOfBirth}
                          onChange={(date) => setDateOfBirth(date)}
                          minDate={new Date("1920-01-01")}
                          maxDate={new Date("2016-12-31")}
                        />

                        <input type="text" placeholder={t("Gender")} value={gender} onChange={(e) => setGender(e.target.value)} />
                        <input type="text" placeholder={t("Re-Enter Password")} value={reEnterpassword} onChange={(e) => setReEnterPassword(e.target.value)} />
                      </div>
                    </div>
                    <Button className="submit" onClick={handleSaveUser}>
                      {t('SignUp')}
                    </Button>
                    <div className="sign-in-button">
                      <h3> {t("If you have already account:")} </h3>
                      <button onClick={handleSignagainInClick} className="sign-in-button-text">
                        {t("SignIn")}
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
            <Slideshow />
            <div className="overlay">
              <div className="join-button-container" >
                <Button className="text build-up-text" style={{
                  fontSize: '20px', fontWeight: 'bold', boxShadow: ' 0 0 10px 4px)',
                  color: '#535c68', backgroundColor: '#535c6836', width: '350px', height: '50px', borderRadius: '25px'
                }} onClick={handleGettingStartedClick}
                >{t("Getting Started")} </Button>

              </div>
            </div>
          </div>

          <div>
            <p className="title_Eco">EcoIsland</p>
            <p className="mainParagraph ">
              {t("Discover a world of sustainable treasures and support local communities")}
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
