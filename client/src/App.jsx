import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './Home'
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} index />
    </Routes>
    
    {/* <ToastContainer/> */}
    </>
  )
}

export default App
