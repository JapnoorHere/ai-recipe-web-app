export const fetchGenerateRecipe = async (recipeDataFinal, dispatch, setRecipe, navigate, hideLoader, setRecipeData, setServingsCount, setDiet, showToast) => {
    fetch(`${import.meta.env.VITE_API_KEY}/api/recipe/generate/`, {
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
}
