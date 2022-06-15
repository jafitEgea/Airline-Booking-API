import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import FlightList from './components/catalog/FlightList';
import FlightSearch from './components/catalog/FlightSearch';
import FSResult from './components/catalog/FSResult';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import NavBar from './components/NavBar';

function App() {
  const[results, setResults] = useState([]);
  const navigate = useNavigate();

  async function fetchFlightsSearch(departureAirport, arrivalAirport, departureDate){
    
    if(departureAirport === '' && arrivalAirport === ''){
      alert("Please, fill in all fields.")
    } else {
        try{
          const response = await fetch(`https://fastapi-app.azurewebsites.net/catalog/?departureAirportCode=${departureAirport}&arrivalAirportCode=${arrivalAirport}&departureDate=${departureDate}`);
          if(response.ok){
          const flights = await response.json();
          console.log(flights);
          setResults(flights);
          navigate('/catalog/search');
          }else{
            alert("No Flights found")
          }
        } catch(error){
          alert("Request error")
        }
     }
    };
    

  return (
    <div className="Airline NS">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<FlightSearch fetchFlightsSearch={fetchFlightsSearch}/>} />
        <Route path="/catalog/search" element={<FSResult results={results}/>}/>
        <Route path="/catalog/all" element={<FlightList/>}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
