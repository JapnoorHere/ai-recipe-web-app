import {createSlice} from '@reduxjs/toolkit';

const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipe: []
    },
    reducers: {
        setRecipe(state, action) {
            state.recipe = action.payload;
        }
    }
})

export const {setRecipe} = recipeSlice.actions;
export default recipeSlice.reducer;
