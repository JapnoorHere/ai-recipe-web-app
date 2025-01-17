import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import recipeReducer from "./recipeSlice";
import signInReducer from "./signInSlice";

const store = configureStore({

    reducer:{
        loader: loaderReducer,
        recipe: recipeReducer,
        signIn: signInReducer
    }

})

export default store;
