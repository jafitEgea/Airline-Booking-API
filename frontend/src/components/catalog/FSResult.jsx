import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useState } from 'react'
import FSCard from './FSCard'

const FSResult = () => {
  const [date, setDate] = useState(new Date());
  console.log(date);
  const handleChange = (newDate) =>{setDate(newDate)};

  return (
    <div>
      <Grid container sx={{bgcolor:'#d2b7e5', pt:1, pb:0.5}} >
        <Grid item xs={1} />
        <Grid item xs={1} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
          <TextField label="From" variant="standard" color='secondary' size='normal' disabled defaultValue="BOG" />
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={1} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
          <TextField label="To" variant="standard" color='secondary' size='normal' disabled defaultValue="LIM" />
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={1.5} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              sx={{color:'#5A189A'}}
              label="Date"
              inputFormat='EE, d MMM'
              disabled
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField label="To" variant="standard" color='secondary' size='normal' {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item flexGrow={1}/>
        
      </Grid>

      <Container maxWidth="sm">
        <Box sx={{bgcolor:'#d2b7e5', borderRadius:4, boxShadow:3, my:'3rem', pb:'1rem'}}>
          <Typography variant='h3' component='h3' sx={{textAlign:'center', py:'2rem', color:'#240046'}}>
            Select your flight
          </Typography>

          {/*mapeo de cards*/}
          <FSCard />
          <FSCard />
          <FSCard />

        </Box>
      </Container>
    </div>
  )
}

export default FSResult