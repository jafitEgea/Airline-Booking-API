import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FlightList from './components/catalog/FlightList'
import FlightSearch from './components/catalog/FlightSearch'
import FSResult from './components/catalog/FSResult'

const MyRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<h1>WELCOME TO THE MAIN PAGE</h1>} />
        <Route path="/catalog" element={<FlightSearch/>} />
        <Route path="/catalog/all" element={<FlightList/>}/>
        <Route path="/catalog/search" element={<FSResult/>}/>
        <Route path="*" element={<h1>Page Not Found. Sorry :(</h1>} />
    </Routes>
  )
}

export default MyRoutes