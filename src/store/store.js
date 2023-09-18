import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import fetchEmailSlice from "./fetchEmailSlice";


const store = configureStore({
    reducer : {auth : authReducer, fetchedData: fetchEmailSlice}
});

export default store;