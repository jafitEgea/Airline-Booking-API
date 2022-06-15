import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';


const FlightSearch = (props) => {
  const sxicons = { 'px':1, 'py':0.5, 'bgcolor':'#240046', 'boxShadow':1};
  const sxbs = {'borderRadius':1.2,
                'p':1.3, 'color': '#dac3e8',
                'backgroundImage':'linear-gradient(40deg, #240046, #5A189A, #b5179e, #bc00dd)',
                'backgroundSize':'250%', 'transition':'0.5s',
                '&:hover': {'bgcolor':'#3C096C', 'backgroundPosition':'right'}};

  const formDataInitial= {departureAirport : '', 
                          arrivalAirport : ''};
  const [formData, setFormData] = useState(formDataInitial);

  const handleInputChange = ev => {
      setFormData(
        {
        ...formData, 
        [ev.target.name] : ev.target.value
      });
  };

  const [date, setDate] = useState(new Date());
  const onlydate = date.toISOString().substring(0,10);

  const handleChange = (newDate) =>{setDate(newDate)};

  return (
    <div>
      <Container maxWidth="sm">
          <Box sx={{bgcolor:'#d2b7e5', borderRadius:4, boxShadow:3, mt:'3rem'}}>
              <Typography variant='h3' component='h3' sx={{textAlign:'center', py:'2rem', color:'#240046'}}>
                Where next?
              </Typography>
              <Box>
                <Grid container>
                  <Grid item xs={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" sx={sxicons}>
                      <FlightTakeoffIcon fontSize='large' sx={{color:'#E0AAFF'}}/>
                    </Avatar>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField required onChange={handleInputChange} id="departureAirport" name="departureAirport"  color='secondary' size='small' variant='filled' label='Departure airport' sx={{width:'96%', boxShadow:1}} />
                  </Grid>
                  <Grid item xs={12} margin='1rem'/>
                  <Grid item xs={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" sx={sxicons}>
                      <FlightLandIcon fontSize='large' sx={{color:'#E0AAFF'}}/>
                    </Avatar>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField required onChange={handleInputChange} id="arrivalAirport" name="arrivalAirport"  color='secondary' size='small' variant='filled' label='Arrival airport' sx={{width:'96%', boxShadow:1}} />
                  </Grid>
                  <Grid item xs={12} margin='1rem'/>
                  <Grid item xs={2} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Avatar variant="rounded" sx={sxicons}>
                      <InsertInvitationRoundedIcon fontSize='large' sx={{color:'#E0AAFF'}}/>
                    </Avatar>  
                  </Grid>
                  <Grid item xs={10}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        sx={{color:'#5A189A'}}
                        label="Pick a date"
                        //inputFormat="dd/MM/yyyy"
                        inputFormat='EEEE, MMM d, yyyy'
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField required size='small' variant='filled' color='secondary' {...params} sx={{width:'96%', boxShadow:1}}/>}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} margin='1rem'/>
                </Grid>
                <Box maxWidth='sm' sx={{display:'flex', justifyContent:'center', py:3, pb:5}}>
                  <Button variant='contained' sx={sxbs} endIcon={<ArrowForwardIosRoundedIcon />} 
                          onClick={() => {props.fetchFlightsSearch(formData.departureAirport,formData.arrivalAirport,onlydate)}}>SEARCH FLIGHTS</Button>
                </Box>
                
              </Box>
          </Box>
          
      </Container>
    </div>
  )
}

export default FlightSearch