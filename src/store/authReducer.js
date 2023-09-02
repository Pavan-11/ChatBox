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
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        }
    }
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;