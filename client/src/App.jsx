import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './Home'
import { ToastContainer } from 'react-toastify';
import RecipePage from './RecipePage';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/recipe" element={<RecipePage />} />
    </Routes>
    
    {/* <ToastContainer/> */}
    </>
  )
}

export default App
