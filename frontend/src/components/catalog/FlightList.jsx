import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'
//import { Typography } from '@mui/material';

export default function FlightList(){
    /*
    const flightsformat = {
        "departureDate": "2022-06-09T02:55:41.076Z",
        "departureAirportCode": "string",
        "departureAirportName": "string",
        "departureCity": "string",
        "departureLocale": "string",
        "arrivalDate": "2022-06-09T02:55:41.076Z",
        "arrivalAirportCode": "string",
        "arrivalAirportName": "string",
        "arrivalCity": "string",
        "arrivalLocale": "string",
        "ticketPrice": 0,
        "ticketCurrency": "string",
        "flightNumber": 0,
        "seatCapacity": 0,
        "id": 0
      } ;
      */
      const initialFlightsList = [ ];
      const [flightsList, setFlightsList] = useState(initialFlightsList);

      //HOOK useEffect - Necesario para hacer peticiones a una API
      useEffect(() => {
          async function fetchFlights(){
              try {
                const response = await fetch("https://fastapi-app.azurewebsites.net/catalog/all");
                if(response.ok){
                  const flights = await response.json();
                  setFlightsList(flights);
                }  
              } catch (error) {
                console.log("La petición no se pudo realizar");
              }    
          }
          fetchFlights();
      }, []);

      const HoursAndMinsDiff= (date1, date2) => {
        let date1h = parseInt(date1.getHours());
        let date2h = parseInt(date2.getHours());
        let hoursdiff = date1h > date2h ? date1h-date2h : date2h-date1h;

        let date1m = parseInt(date1.getMinutes());
        let date2m = parseInt(date2.getMinutes());
        let minsdiff = date1m > date2m ? date1m-date2m : date2m-date1m;

        const diff = `${hoursdiff}h ${minsdiff}m`;

        return diff;
    }
        
      return ( <>
                    <Container maxWidth="lg">
                    <TableContainer component={Paper} sx={{mt:'3rem', bgcolor:'#d2b7e5'}}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Flight Number</TableCell>
                                    <TableCell align="center">departure Date</TableCell>
                                    <TableCell align="center">departure Time</TableCell>
                                    <TableCell align="center">departure Airport Code</TableCell>
                                    <TableCell align="center">departure Airport Name</TableCell>
                                    <TableCell align="center">Arrival Airport Code</TableCell>
                                    <TableCell align="center">Arrival Airport Name</TableCell>
                                    <TableCell align="center">Arrival Time</TableCell>
                                    <TableCell align="center">Time Difference</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    flightsList.length > 0 ?
                                        flightsList.map(flight => (
                                                <TableRow key={flight.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row" align="center" sx={{fontWeight:"bold"}} >
                                                            {flight.flightNumber}
                                                        </TableCell>
                                                        <TableCell align="center">{new Date(flight.departureDate).toDateString()}</TableCell>
                                                        <TableCell align="center">{new Date(flight.departureDate).toISOString().substring(11,16)}</TableCell>
                                                        <TableCell align="center">{flight.departureAirportCode}</TableCell>
                                                        <TableCell align="center">{flight.departureAirportName}</TableCell>
                                                        <TableCell align="center">{flight.arrivalAirportCode}</TableCell>
                                                        <TableCell align="center">{flight.arrivalAirportName}</TableCell>
                                                        <TableCell align="center">{new Date(flight.arrivalDate).toISOString().substring(11,16)}</TableCell>
                                                        <TableCell align="center">{HoursAndMinsDiff(new Date(flight.departureDate), new Date(flight.arrivalDate))}</TableCell>
                                                </TableRow>

                                        ))
                                    :   <TableRow>
                                            <TableCell>NO DATA</TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer> 
                    </Container>
                    
            </>
      );
}