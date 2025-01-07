import React, { useState } from "react";

import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";

import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "@/utils/loaderSlice";
import { setRecipe } from "@/utils/recipeSlice";

import BannerImage from "@/assets/home-banner.jpg";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/Loader";

const Banner = () => {
    const [recipeData, setRecipeData] = useState({
        recipeName: "",
        cuisine: "",
        healthGoals: "",
        restrictions: ""
    });
    const [servingsCount, setServingsCount] = useState(1);
    const [diet, setDiet] = useState("veg");

    const [openDialog, setOpenDialog] = useState(false);
    const { showToast } = useToast();

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loader.loading);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNextClick = () => {
        if (recipeData.recipeName.trim().length === 0) {
            showToast("Please enter a recipe name", "error");
        } else {
            setOpenDialog(true);
        }
    };

    const handleIncrement = () => setServingsCount((prev) => prev + 1);

    const handleDecrement = () => {
        if (servingsCount > 1) setServingsCount((prev) => prev - 1);
    };

    const handleDoneClick = () => {
        dispatch(showLoader());
        const recipeDataFinal = {
            recipeName: recipeData.recipeName || "Not provided by user",
            servingsCount: servingsCount || 1,
            diet: diet || "veg",
            cuisine: recipeData.cuisine.trim() || "Not provided by user",
            healthGoals: recipeData.healthGoals.trim() || "Not provided by user",
            restrictions: recipeData.restrictions.trim() || "Not provided by user",
        };
        console.log(JSON.stringify(recipeDataFinal));
        setOpenDialog(false);


        fetch("http://localhost:3000/api/recipe/generate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeDataFinal),
        })
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 400) {
                    const errorMessage = await res.json();
                    console.log(errorMessage);
                    throw new Error(errorMessage.reason);
                }
            })
            .then((data) => {
                dispatch(hideLoader());
                console.log(data);
                dispatch(setRecipe(data)); // Update recipe data
                navigate("/recipe");
            })
            .catch((error) => {
                console.log("Error part");
                dispatch(hideLoader());
                showToast(error.message, "error");
                dispatch(setRecipe(null)); // Reset recipe data in Redux
            });
        setRecipeData({
            recipeName: "",
            cuisine: "",
            healthGoals: "",
            restrictions: "",
        });
        setServingsCount(1);
        setDiet("veg");
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="relative h-[80vh] w-full bg-gradient-to-br from-amber-50 to-orange-100">

                <img
                    src={BannerImage}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/50 to-black/30"></div>

                <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-amber-500">
                        What do you want to cook today?
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-6 text-amber-200">
                        Discover recipes, step-by-step instructions, and more!
                    </p>

                    <div className="flex w-full max-w-lg items-center space-x-2">
                        <Input
                            name="recipeName"
                            type="text"
                            placeholder="Recipe Name (at least 2 words)"
                            className="flex-1 text-gray-800"
                            onChange={handleChange}
                            value={recipeData.recipeName}
                        />
                        <Button
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-orange-500 hover:to-amber-500"
                            onClick={handleNextClick}
                        >
                            Next
                        </Button>
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
                                                onClick={() => setDiet(value)}
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
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Banner;
