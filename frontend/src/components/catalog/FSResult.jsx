import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const FSResult = () => {
  return (
    <div>
      <Grid container spacing={1} sx={{bgcolor:'#d2b7e5'}} >
        <Grid item xs={1} border={1}>
          <TextField label="From" variant="standard" color='secondary' size='normal' disabled defaultValue="BOG" sx={{color:'#240046'}} />
        </Grid>
        <Grid item xs={1} border={1}>
          testing 2
        </Grid>
        <Grid item xs={1} border={1}>
          testing 2
        </Grid>
        <Grid item xs={8} border={1}/>
        <Grid item xs={1} border={1}>
          filter|sort
        </Grid>
      </Grid>
      <Container maxWidth="sm" sx={{border:1}}>
        <Box sx={{bgcolor:'#d2b7e5', borderRadius:4, boxShadow:4, mt:'3rem'}}>
          <Typography variant='h3' component='h3' sx={{textAlign:'center', py:'2rem', color:'#240046'}}>
            Select your flight
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default FSResult