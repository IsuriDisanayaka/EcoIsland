import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import "./style.css";
import Chart from '../../components/chart';
import post from '../../assets/img/post.png';
import users from '../../assets/img/users.png';
import { useTranslation } from 'react-i18next';



function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);
  const { t } = useTranslation();


  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/user/total')
      .then(res => {
        console.log(res);
        setTotalCustomers(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/post/total')
      .then(res => {
        console.log(res);
        setTotalPosts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (

    <Grid container spacing={1} style={{
      marginTop: '-29px',
      marginLeft: '64px'
    }}>
      <h1 style={{
        fontWeight: 'lighter', fontSize: '53px',
        fontFamily: 'fangsong', color: '#a70d92'
      }}>{t("DashBoard")}</h1>
      <Grid item xs={3} md={6} lg={7}>
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            width: 1300,
            height: 1000,
            marginTop: '408px',
            marginLeft: '-235px'
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Grid item xs={12} md={1} lg={2}>
          <Paper
            sx={{
              p: 4,
              display: 'grid',
              flexDirection: 'row',
              position: 'absolute',
              top: '10px',
              width: 450,
              height: 150,
              marginTop: '200px',
              marginLeft: '-500px'
            }}
          >
            <p className='totalcustomer' style={{ color: 'rgb(71 41 125)', FrontStyle: 'bold', frontFamily: 'fantasy', fontStretch: 'expanded' }}>{t("Customer Total")}</p>
            <p className='total'> {totalCustomers}</p>
            <img src={users} style={{ marginLeft: '252px', width: '149px', marginTop: '-248px' }} />


          </Paper>
        </Grid>
        <Grid item xs={1} md={2} lg={1}>
          <Paper
            sx={{
              p: 4,
              display: 'grid',
              flexDirection: 'row',
              width: 450,
              height: 150,
              marginLeft: '-1050px',
              marginTop: '-87px',
            }}
          >
            <p className='totalcustomer' style={{ color: 'rgb(110 119 43)', FrontStyle: 'bold', frontFamily: 'fantasy', fontStretch: 'expanded' }}>{t("Post Total")}</p>
            <p className='total'> {totalPosts}</p>
            <img src={post} style={{ marginLeft: '252px', width: '149px', marginTop: '-258px' }} />

          </Paper>
        </Grid>
      </div>
    </Grid>
  )
}

export default Dashboard;
