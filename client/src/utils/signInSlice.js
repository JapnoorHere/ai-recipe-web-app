import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
    name: "signedIn",
    initialState: {
        user: null
    },
    reducers:{
        signInUser(state, action){
            state.user = action.payload;
        },
        signOutUser(state, action){
            state.user = null
        }
    }
})  

export const {signInUser, signOutUser} = signInSlice.actions;
export default signInSlice.reducer
