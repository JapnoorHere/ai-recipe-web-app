import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from './pages/Home/HomePage';
import RecipePage from './pages/Recipe/RecipePage';
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    

    return (
        <>
            <Routes>
                <Route index path="/" element={<HomePage />}/>
                <Route path="/recipe" element={<RecipePage />} />
            </Routes>
            
        </>
    )
}

export default App
