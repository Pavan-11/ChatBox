import {createSlice} from '@reduxjs/toolkit';


const initialAuthState = {
    isLoggedIn : false,
    token : null,
    userId : null,
};

const AuthSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token; // Set the token from the action payload
            state.userId = action.payload.userId;
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
        }
    }
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;