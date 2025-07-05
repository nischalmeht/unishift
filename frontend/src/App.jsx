import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import EmployeeDetails from './components/EmployeeDetails'
import Employees from './pages/Employees'
import {  Routes, Route, Link } from 'react-router-dom';
import EmployeesUser from './components/EmployeesUser'
function App() {

  return (
    <>
    <div className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark group/design-root overflow-x-hidden"
     >
     <Navbar/>
     
     <Routes>
     <Route path="/" element={<Dashboard />} />
     <Route path="/employees" element={<EmployeeDetails />} />
     <Route path="/add" element={<Employees/>}/>
     <Route path="/:id" element={<EmployeesUser/>}/>
     </Routes>
    </div>
    </>
  )
}

export default App
