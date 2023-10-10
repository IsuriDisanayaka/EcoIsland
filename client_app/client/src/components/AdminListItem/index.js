import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Warning } from 'react-router-dom';

import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person';
import Home from '../../screen/DashBoard';
import AdminProfile from '../../screen/AdminProfile';
import PostList from '../../components/posts/PostList/index';
import PostAll from '../../screen/AllPost';
import logo from "../../assets/img/logo.png";
import SeeAllUser from "../../screen/UserProfile/SeeAllUser"
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ApprovalIcon from '@mui/icons-material/Approval';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '91.5vh',

        overflow: 'hidden'




    },
    drawer: {
        backgroundColor: '#000',
    },

    list: {

    },
    content: {
        flexGrow: 1,
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



function ListItems() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    function logout() {


        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        localStorage.clear();

        window.location.href = '/';

    }



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
                            <MenuIcon style={{ color: '#000' }} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexShrink: 0,
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
                    <Drawer style={{ backgroundColor: '', }} variant="permanent" open={open}>
                        <List component="nav" className={classes.list}>
                            <img className="logoDash" src={logo} alt="" style={{
                                width: '115px',
                                height: '135px',
                                position: 'relative',
                                left: '80px',
                            }} />
                            <p></p>
                            <p></p>
                            <Link to="/AdminDashboard/" style={{
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
                                    }} primary="Home" />
                                </ListItem>

                            </Link>
                            <Link to="/AdminDashboard/viewAllUser" style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem button style={{
                                    color: '#535c68', position: 'relative',
                                    caretColor: 'red',

                                    '&:hover': {
                                        color: 'white'
                                    }
                                }}>
                                    <ListItemIcon>
                                        <PeopleAltIcon style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary="Customers" />
                                </ListItem>

                            </Link>

                            <Link to="/AdminDashboard/PostAll" style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem button style={{
                                    color: '#535c68', position: 'relative',
                                    caretColor: 'red',

                                    '&:hover': {
                                        color: 'green'
                                    }
                                }}>
                                    <ListItemIcon>
                                        <BackupTableIcon style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary="Post All" />
                                </ListItem>
                            </Link>
                            <Link to="/AdminDashboard/adminProfile" style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem button style={{
                                    color: '#535c68', position: 'relative',

                                }}>
                                    <ListItemIcon>
                                        <PersonIcon s style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary="My Profile" />

                                </ListItem>
                            </Link>
                            <Link to="/AdminDashboard/review" style={{ textDecoration: 'none' }}>
                                <ListItem button style={{
                                    position: 'relative',

                                }}>
                                    <ListItemIcon>
                                        <ApprovalIcon style={{ color: '#fff' }} />
                                    </ListItemIcon>
                                    <ListItemText style={{
                                        textDecoration: 'none', color: 'white',
                                    }} primary="Posts For Approvel" />
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
                                }} primary="Logout" />
                            </ListItem>
                        </Link>

                        <Button style={{
                            width: "306px", position: 'relative'
                            , top: '269px'
                        }} variant="contained" startIcon={<AutoAwesomeIcon style={{ color: 'yellow' }} />}>
                            Upgrade Pro
                        </Button>




                    </Drawer>
                    <div className={classes.content} style={{ overflow: 'hidden', flexGrow: 1 }}>

                        <Switch>
                            <Route exact path="/AdminDashboard/" component={Home} />
                            <Route path="/AdminDashboard/viewAllUser" component={SeeAllUser} />

                            <Route path="/AdminDashboard/adminProfile" component={AdminProfile} />
                            <Route path="/AdminDashboard/review" component={PostList} />



                            <Route path="/AdminDashboard/PostAll" component={PostAll} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default ListItems
