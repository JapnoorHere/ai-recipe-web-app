import React from "react";

import Banner from './Banner'
import RecipeCategories from './RecipeCategories'
import Navbar from "../../components/Navbar";
const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <Banner />
            <RecipeCategories />
        </div>
    );
};




export default HomePage;
