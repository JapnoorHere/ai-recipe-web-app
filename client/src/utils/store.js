import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import recipeReducer from "./recipeSlice";

const store = configureStore({

    reducer:{
        loader: loaderReducer,
        recipe: recipeReducer
    }

})

export default store;
