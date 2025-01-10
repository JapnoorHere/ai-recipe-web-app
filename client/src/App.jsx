import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from './pages/Home/HomePage';
import RecipePage from './pages/Recipe/RecipePage';
import LoginPage from './pages/Auth/LoginPage';
const App = () => {
    return (
        <>
            <Routes>
                <Route index path="/" element={<HomePage />}/>
                <Route path="/recipe" element={<RecipePage />} />
                <Route path="login" element={<LoginPage />}  />
            </Routes>
            
        </>
    )
}

export default App
