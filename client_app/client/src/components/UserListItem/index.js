import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Warning } from 'react-router-dom';


import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';


import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UserProfile from '../../screen/UserProfile'
import NewPostForm from '../posts/NewPost';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'
import PostAll from '../../screen/AllPost';
import logo from "../../assets/img/logo.png";
import { useTranslation } from 'react-i18next';
import LanguageDropdown from "../../components/LanguageDropdown";


import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '91.5vh',


    },
    list: {
        width: 200,

    },
    content: {
        flexGrow: 1,
        padding: '10px',
    },
}));
const drawerWidth = 340;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            backgroundColor: '#1f2937',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);



function UserListItems() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    function logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.clear();
        window.location.href = '/';
    }


    const { t } = useTranslation();






    return (
        <div>
            <div >

                <AppBar position="absolute" open={open}>
                    <Toolbar
                        style={{
                            pr: '24px',
                            backgroundColor: '#ffff',
                            height: '40px'
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="#000"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="#000"
                            fontWeight={"bold"}
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {t("Welcome")}
                        </Typography>
                        <LanguageDropdown />

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav" >



                    </List>
                </Drawer>
            </div>
            <div className={classes.root}>
                <Router>
                    <Drawer variant="permanent" open={open}>
                        <List component="nav" className={classes.list}>
                            <img className="logoDash" src={logo} alt="" style={{
                                width: '115px',
                                height: '135px',
                                position: 'relative',
                                left: '80px',
                            }} />
                            <p></p>
                            <p></p>
                            <Link to="/UserDashboard/" style={{
                                textDecoration: 'none', color: 'white',
                            }}>

                                <ListItem button style={{
                                    color: '#535c68',
                                    transition: 'opacity 0.2s ease-in-out',
                                    '&:hover': {
                                        opacity: 1,
                                        color: 'white'
                                    }
                                }}>
                                    <ListItemIcon>
                                        <HomeIcon style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary={t("Home")} />
                                </ListItem>

                            </Link>



                            <Link to="/UserDashboard/UserProfile" style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem button style={{
                                    color: '#535c68', position: 'relative',

                                }}>
                                    <ListItemIcon>
                                        <PersonIcon s style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary={t("My Profile")} />

                                </ListItem>
                            </Link>
                            <Link to="/UserDashboard/NewPostForm" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{
                                    position: 'relative',

                                }}>
                                    <ListItemIcon>
                                        <PostAddIcon style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary={t("New Post")} />
                                </ListItem>
                            </Link>
                        </List>


                        <Link to="/" onClick={logout} style={{ textDecoration: 'none', color: 'white', }}>
                            <ListItem button style={{ position: 'relative', color: '#fff' }}>
                                <ListItemIcon>
                                    <LogoutIcon style={{ color: '#fff' }} />
                                </ListItemIcon>
                                <ListItemText style={{
                                    textDecoration: 'none', color: 'white',
                                }} primary={t("Logout")} />
                            </ListItem>
                        </Link>

                        <Button style={{
                            width: "306px", position: 'relative'
                            , top: '269px'
                        }} variant="contained" startIcon={<AutoAwesomeIcon style={{ color: 'yellow' }} />}>
                            {t("Upgrade Pro")}
                        </Button>

                    </Drawer>
                    <div className={classes.content} style={{ overflow: 'hidden', flexGrow: 1 }}>

                        <Switch>
                            <Route path="/UserDashboard/UserProfile" component={UserProfile} />


                            <Route path="/UserDashboard/NewPostForm" component={NewPostForm} />



                            <Route path="/UserDashboard/" component={PostAll} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default UserListItems
