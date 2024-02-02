import { createSlice } from "@reduxjs/toolkit";

const initialState={
  isAuthenticated:window.localStorage.getItem('usertoken')?true:false,
  usertoken:window.localStorage.getItem('usertoken') || '',
  userid:window.localStorage.getItem('userid') || '',
}

const authSlice=createSlice({
  name:'authentication',
  initialState,
  reducers:{
    login(state,action){
      state.isAuthenticated=true;
      state.usertoken=action.payload.usertoken;
      window.localStorage.setItem('usertoken',state.usertoken)
      state.userid=action.payload.userid;
      window.localStorage.setItem('userid',state.userid)
    },
    logout(state){
      state.isAuthenticated=false;
      state.usertoken='';
      window.localStorage.removeItem('usertoken')
      state.userid='';
      window.localStorage.removeItem('userid')
    }
  }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;