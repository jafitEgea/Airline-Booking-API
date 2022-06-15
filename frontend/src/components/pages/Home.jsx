import React from 'react'
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
        <Typography variant='h2' component='h2' sx={{fontWeight:'bold', textAlign:'center', py:'2rem', color:'#240046'}}>
            Welcome to Airline NS.
        </Typography>
        <Typography variant='h3' component='h3' sx={{textAlign:'center', py:'2rem', color:'#240046'}}>
            Are you ready to take a flight?
        </Typography>
    </div>
  )
}

export default Home;