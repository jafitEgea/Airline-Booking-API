import React from 'react'
import Typography from '@mui/material/Typography'
import { AppBar, Avatar, Box, Button, Container, Toolbar } from '@mui/material'
import ConnectingAirportsRoundedIcon from '@mui/icons-material/ConnectingAirportsRounded';

const NavBar = () => {
  const sxbutton = { 'borderRadius':5,
                      'm':1, 'mr':-0.5,
                      'color': '#240046',
                      'bgcolor':'#E0AAFF',
                      '&:hover': {'bgcolor':'#C77DFF'} };
  return ( <>
        <AppBar position="fixed" sx={{bgcolor:'#10002B', background:'linear-gradient(40deg, #240046 30%, #5A189A)', boxShadow:'none'}}>
          <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box noWrap component="a" href="/" sx={{bgcolor: '#240046', display:'inline-flex', boxShadow:1, borderRadius:4, borderColor:'#E0AAFF' , p:0.5, ml:-1}}>
                  <Avatar sx={{bgcolor:'#5A189A', mr:1.5}}>
                    <ConnectingAirportsRoundedIcon fontSize='medium' sx={{color:'#E0AAFF'}} />
                  </Avatar>
                  <Typography variant="h6"
                    sx={{
                      mr: 0.5,
                      mt: 0.5,
                      fontFamily: 'fantasy',
                      fontWeight: 100,                    
                      color: '#E0AAFF',
                      textDecoration: 'none',
                    }}>
                      Airline NS
                    </Typography>
                </Box>
                <Box sx={{display:'inline-flex', flexGrow:1}}></Box>
                <Box sx={{display:'inline-flex'}}>
                    <Button variant='contained' sx={sxbutton} href="/catalog"   >
                      Flights Search
                    </Button>
                </Box>
                <Box sx={{display:'inline-flex'}}>
                    <Button variant='contained' sx={sxbutton} href="/catalog/all"   >
                      All Flights
                    </Button>
                </Box>
                    
             </Toolbar>
          </Container>
        </AppBar>
        <Toolbar/>
        </>

  )
}

export default NavBar