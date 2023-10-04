import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Chart from '../components/Chart';
import "../assets/css/Dashboard.css"

function Dashboard() {
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/user/total')
      .then(res => {
        console.log(res);
        setTotalCustomers(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/product/total')
      .then(res => {
        console.log(res);
        setTotalProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
   
      <Grid  container spacing={1}>
        <Grid item xs={3} md={6} lg={7}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              width:600,
              height: 600,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={1} lg={2}>
          <Paper
            sx={{
              p: 4,
              display: 'grid',
              flexDirection: 'row',
              width:150,
              height: 200,
            }}
          >
            <p className='totalcustomer' style={{color:'#65bd7d',FrontStyle:'bold',frontFamily:'fantasy',fontStretch:'expanded'}}>Customer Total</p>
            <p className='total'> {totalCustomers}</p>
          </Paper>
        </Grid>
        <Grid item xs={1} md={2} lg={1}>
          <Paper
            sx={{
              p: 4,
              display: 'grid',
              flexDirection: 'row',
              width:150,
              height: 200,
            }}
          >
            <p className='totalcustomer' style={{color:'#65bd7d',FrontStyle:'bold',frontFamily:'fantasy',fontStretch:'expanded'}}>Product Total</p>
            <p className='total'> {totalProducts}</p>
          </Paper>
        </Grid>
      </Grid>
   
  )
}

export default Dashboard;
