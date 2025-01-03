'use client';

import { useState } from 'react';

import { useNavigate } from "react-router";

import RecipeCategoriesCard from './RecipeCategoriesCard';
import { categories, recipes } from '@/utils/RecipeCategoriesData';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/useToast";

import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "@/utils/loaderSlice";
import { setRecipe } from "@/utils/recipeSlice";

import Loader from '@/components/Loader';
import { ToastContainer } from "react-toastify";
import { fetchGenerateRecipe } from '@/hooks/fetchGenerateRecipe';


const RecipeCategories = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [openDialog, setOpenDialog] = useState(false);

    const [recipeData, setRecipeData] = useState({
        recipeName: "",
        cuisine: "",
        healthGoals: "",
        restrictions: ""
    });
    const [servingsCount, setServingsCount] = useState(1);
    const [diet, setDiet] = useState("veg");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loader.loading);
    const { showToast } = useToast();


    const filteredRecipes = recipes.filter(recipe => recipe.cuisine === activeCategory);

    const handleCardClick = (name, diet, cuisine) => {
        setOpenDialog(true);
        setRecipeData({
            recipeName: name,
            cuisine: cuisine,
            healthGoals: "",
            restrictions: ""
        })
        setDiet(diet);
    }

    const handleDoneClick = () => {
        dispatch(showLoader());
        const recipeDataFinal = {
            recipeName: recipeData.recipeName,
            servingsCount: servingsCount || 1,
            diet: diet || "veg",
            cuisine: recipeData.cuisine.trim() || "Not provided by user",
            healthGoals: recipeData.healthGoals.trim() || "Not provided by user",
            restrictions: recipeData.restrictions.trim() || "Not provided by user",
        };
        console.log(JSON.stringify(recipeDataFinal));

        setOpenDialog(false);
        fetchGenerateRecipe(recipeDataFinal, dispatch, setRecipe, navigate, hideLoader, setRecipeData, setServingsCount, setDiet, showToast);

        // fetch(`${import.meta.env.VITE_API_KEY}/api/recipe/generate/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(recipeDataFinal),
        // })
        //     .then(async (res) => {
        //         if (res.ok) {
        //             return res.json();
        //         } else if (res.status === 400) {
        //             const errorMessage = await res.json();
        //             console.log(errorMessage);
        //             throw new Error(errorMessage.reason);
        //         }
        //     })
        //     .then((data) => {
        //         dispatch(hideLoader());
        //         console.log(data);
        //         dispatch(setRecipe(data)); // Update recipe data
        //         navigate("/recipe");
        //     })
        //     .catch((error) => {
        //         console.log("Error part");
        //         dispatch(hideLoader());
        //         showToast(error.message, "error");
        //         dispatch(setRecipe(null)); // Reset recipe data in Redux
        //     });

        // setRecipeData({
        //     recipeName: "",
        //     cuisine: "",
        //     healthGoals: "",
        //     restrictions: "",
        // });
        // setServingsCount(1);
        // setDiet("veg");
    }

    const handleIncrement = () => setServingsCount((prev) => prev + 1);

    const handleDecrement = () => {
        if (servingsCount > 1) setServingsCount((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="container max-w-[1300px] mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Discover Flavors Around the World
                </h2>

                {/* Category Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out shadow-sm 
                        ${activeCategory === category
                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:shadow-md hover:scale-105'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Recipe Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRecipes.map((recipe, index) => (
                        <RecipeCategoriesCard
                            key={index}
                            {...recipe}
                            handleCardClick={handleCardClick}
                        />
                    ))}
                </div>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <div className="hidden"></div>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg bg-white rounded-lg p-6">
                        <DialogHeader>
                            <DialogTitle className="text-amber-800">{recipeData.recipeName}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="servings" className="text-gray-800">
                                    Servings
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleDecrement}
                                        disabled={servingsCount === 1}
                                        className="w-8 h-8 p-0"
                                    >
                                        -
                                    </Button>
                                    <Input
                                        id="servings"
                                        type="number"
                                        value={servingsCount}
                                        readOnly
                                        className="text-center w-12 border rounded-lg"
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={handleIncrement}
                                        className="w-8 h-8 p-0"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <Label className="text-gray-800">Dietary Preference</Label>
                                <div className="flex space-x-2">
                                    {[
                                        { value: "veg", label: "Veg" },
                                        { value: "nonveg", label: "Non-Veg" },
                                        { value: "vegan", label: "Vegan" },
                                    ].map(({ value, label }) => (
                                        <Button
                                            key={value}
                                            className={`py-2 px-4 rounded-lg shadow-md ${diet === value
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                                                : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label htmlFor="cuisine" className="text-gray-800">
                                        Cuisine Preference
                                    </Label>
                                    <Input
                                        id="cuisine"
                                        name="cuisine"
                                        className="w-full mt-2 border rounded-lg"
                                        placeholder="e.g., Italian, Indian, Chinese (Optional)"
                                        onChange={handleChange}
                                        value={recipeData.cuisine}
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="healthGoals" className="text-gray-800">
                                        Health Goals
                                    </Label>
                                    <Input
                                        id="healthGoals"
                                        name="healthGoals"
                                        className="w-full mt-2 border rounded-lg"
                                        placeholder="e.g., low-calorie, high-protein recipe (Optional)"
                                        onChange={handleChange}
                                        value={recipeData.healthGoals}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="restrictions" className="text-gray-800">
                                        Restrictions
                                    </Label>
                                    <Input
                                        id="restrictions"
                                        name="restrictions"
                                        className="w-full mt-2 border rounded-lg"
                                        placeholder="Ingredients you'd like to avoid? (Optional)"
                                        onChange={handleChange}
                                        value={recipeData.restrictions}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg hover:from-orange-500 hover:to-amber-500"
                            onClick={handleDoneClick}
                        >
                            Done
                        </Button>
                    </DialogContent>
                </Dialog>
            <ToastContainer />
            </div>

        </>
    );
}

export default RecipeCategories;
