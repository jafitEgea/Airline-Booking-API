import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FlightList from './components/catalog/FlightList'
import FlightSearch from './components/catalog/FlightSearch'
import FSResult from './components/catalog/FSResult'
import Home from './components/catalog/Home'
import PageNotFound from './components/catalog/PageNotFound'

const MyRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<FlightSearch/>} />
        <Route path="/catalog/all" element={<FlightList/>}/>
        <Route path="/catalog/search" element={<FSResult/>}/>
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}

export default MyRoutes