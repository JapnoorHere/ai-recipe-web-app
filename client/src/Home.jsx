import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./hooks/useToast";

import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "./utils/loaderSlice";
import { setRecipe } from "./utils/recipeSlice";

import BannerImage from "./assets/home-banner.jpg";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

const categories = ['Indian', 'Chinese', 'Italian', 'Mexican', 'American', 'Desserts'];

const recipes = [
  // Indian Recipes
  { type: 'Indian', name: 'Butter Chicken', description: 'Rich and creamy chicken curry', image: '/images/butter-chicken.jpg', diet: 'nonveg' },
  { type: 'Indian', name: 'Paneer Tikka', description: 'Spiced and grilled paneer cubes', image: '/images/paneer-tikka.jpg', diet: 'veg' },
  { type: 'Indian', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potatoes', image: '/images/masala-dosa.jpg', diet: 'veg' },
  { type: 'Indian', name: 'Biryani', description: 'Aromatic spiced rice with meat or vegetables', image: '/images/biryani.jpg', diet: 'nonveg' },
  { type: 'Indian', name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', image: '/images/chole-bhature.jpg', diet: 'veg' },
  { type: 'Indian', name: 'Rogan Josh', description: 'Flavorful lamb curry', image: '/images/rogan-josh.jpg', diet: 'nonveg' },

  // Chinese Recipes
  { type: 'Chinese', name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts and chili peppers', image: '/images/kung-pao-chicken.jpg', diet: 'nonveg' },
  { type: 'Chinese', name: 'Spring Rolls', description: 'Crispy rolls filled with vegetables or meat', image: '/images/spring-rolls.jpg', diet: 'veg' },
  { type: 'Chinese', name: 'Fried Rice', description: 'Rice stir-fried with vegetables, eggs, and meat', image: '/images/fried-rice.jpg', diet: 'nonveg' },
  { type: 'Chinese', name: 'Sweet and Sour Pork', description: 'Tangy and flavorful pork dish', image: '/images/sweet-sour-pork.jpg', diet: 'nonveg' },
  { type: 'Chinese', name: 'Wonton Soup', description: 'Soup with wonton dumplings', image: '/images/wonton-soup.jpg', diet: 'nonveg' },
  { type: 'Chinese', name: 'Chow Mein', description: 'Stir-fried noodles with vegetables and meat', image: '/images/chow-mein.jpg', diet: 'nonveg' },

  // Italian Recipes
  { type: 'Italian', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, and pancetta', image: '/images/spaghetti-carbonara.jpg', diet: 'nonveg' },
  { type: 'Italian', name: 'Lasagna', description: 'Layered pasta with meat and cheese', image: '/images/lasagna.jpg', diet: 'nonveg' },
  { type: 'Italian', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', image: '/images/bruschetta.jpg', diet: 'veg' },
  { type: 'Italian', name: 'Risotto', description: 'Creamy rice dish with various flavors', image: '/images/risotto.jpg', diet: 'veg' },
  { type: 'Italian', name: 'Caprese Salad', description: 'Tomatoes, mozzarella, and basil', image: '/images/caprese-salad.jpg', diet: 'veg' },
  { type: 'Italian', name: 'Gelato', description: 'Creamy Italian ice cream', image: '/images/gelato.jpg', diet: 'veg' },

  // Mexican Recipes
  { type: 'Mexican', name: 'Guacamole', description: 'Creamy avocado dip', image: '/images/guacamole.jpg', diet: 'veg' },
  { type: 'Mexican', name: 'Enchiladas', description: 'Rolled tortillas filled with meat and cheese', image: '/images/enchiladas.jpg', diet: 'nonveg' },
  { type: 'Mexican', name: 'Churros', description: 'Crispy fried dough with cinnamon sugar', image: '/images/churros.jpg', diet: 'veg' },
  { type: 'Mexican', name: 'Quesadillas', description: 'Tortilla with melted cheese and fillings', image: '/images/quesadillas.jpg', diet: 'veg' },
  { type: 'Mexican', name: 'Pozole', description: 'Hominy soup with meat and spices', image: '/images/pozole.jpg', diet: 'nonveg' },
  { type: 'Mexican', name: 'Tamales', description: 'Corn dough with fillings steamed in corn husks', image: '/images/tamales.jpg', diet: 'veg' },

  // American Recipes
  { type: 'American', name: 'BBQ Ribs', description: 'Juicy ribs with smoky barbecue sauce', image: '/images/bbq-ribs.jpg', diet: 'nonveg' },
  { type: 'American', name: 'Mac and Cheese', description: 'Creamy pasta with cheese sauce', image: '/images/mac-and-cheese.jpg', diet: 'veg' },
  { type: 'American', name: 'Fried Chicken', description: 'Crispy and golden fried chicken', image: '/images/fried-chicken.jpg', diet: 'nonveg' },
  { type: 'American', name: 'Apple Pie', description: 'Classic dessert with spiced apple filling', image: '/images/apple-pie.jpg', diet: 'veg' },
  { type: 'American', name: 'Cornbread', description: 'Moist and sweet bread', image: '/images/cornbread.jpg', diet: 'veg' },
  { type: 'American', name: 'Clam Chowder', description: 'Creamy soup with clams and potatoes', image: '/images/clam-chowder.jpg', diet: 'nonveg' },

  // Desserts
  { type: 'Desserts', name: 'Chocolate Cake', description: 'Rich and moist chocolate dessert', image: '/images/chocolate-cake.jpg', diet: 'veg' },
  { type: 'Desserts', name: 'Cheesecake', description: 'Creamy dessert with a biscuit base', image: '/images/cheesecake.jpg', diet: 'veg' },
  { type: 'Desserts', name: 'Brownies', description: 'Fudgy chocolate squares', image: '/images/brownies.jpg', diet: 'veg' },
  { type: 'Desserts', name: 'Ice Cream Sundae', description: 'Ice cream topped with sauces and nuts', image: '/images/ice-cream-sundae.jpg', diet: 'veg' },
  { type: 'Desserts', name: 'Panna Cotta', description: 'Creamy Italian dessert', image: '/images/panna-cotta.jpg', diet: 'veg' },
  { type: 'Desserts', name: 'Lemon Tart', description: 'Tangy and sweet lemon dessert', image: '/images/lemon-tart.jpg', diet: 'veg' },
];

const Home = () => {
    return (
        <div>
            <Banner />
            <RecipeCategories />
        </div>
    );
};

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
                setRecipeData({
                    recipeName: "",
                    cuisine: "",
                    healthGoals: "",
                    restrictions: "",
                }); // Clear local state
            });
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

const RecipeCategories = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const filteredRecipes = recipes.filter((recipe) => recipe.type === activeCategory);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Recipe Categories</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                            activeCategory === category
                                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:shadow-md hover:scale-105'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe, index) => (
                    <RecipeCard key={index} {...recipe} />
                ))}
            </div>
        </div>
    );
};

const RecipeCard = ({ name, description, image, type, diet }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeData, setRecipeData] = useState({});

    const handleClick = () => {
        setRecipeData({ recipeName: name, cuisine: type, diet, healthGoals: "", restrictions: "" });
        setOpenDialog(true);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="relative h-48 w-full">
                <img
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={handleClick}>{name}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/20 to-orange-500/20 pointer-events-none" />

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
                            <Label htmlFor="diet" className="text-gray-800">Dietary Preference</Label>
                            <p>{diet}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="cuisine" className="text-gray-800">Cuisine</Label>
                            <p>{type}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

    const handleDoneClick = () => {
        dispatch(showLoader());
        const recipeDataFinal = {
            recipeName: recipeData.recipeName || "Not provided by user",
            servingsCount: servingsCount || 1,
            diet: diet || "veg",
            cuisine: recipeData.cuisine || "Not provided by user",
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
                dispatch(setRecipe(data));
                navigate("/recipe");
            })
            .catch((error) => {
                console.log("Error part");
                dispatch(hideLoader());
                showToast(error.message, "error");
                dispatch(setRecipe(null));
            });
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 cursor-pointer" onClick={() => setOpenDialog(true)}>{name}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/20 to-orange-500/20 pointer-events-none" />

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
                                    onChange={(e) => setRecipeData({ ...recipeData, healthGoals: e.target.value })}
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
                                    onChange={(e) => setRecipeData({ ...recipeData, restrictions: e.target.value })}
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
    );

export default Home;
