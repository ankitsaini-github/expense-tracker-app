import { createSlice } from "@reduxjs/toolkit";

const initialState={
  isPro:false,
  darktheme:false,
}

const themeSlice=createSlice({
  name: 'theme',
  initialState,
  reducers:{
    setpro(state){
      state.isPro=true
    },
    toggletheme(state){
      state.darktheme=!state.darktheme
    },
  }
})

export const themeActions=themeSlice.actions;
export default themeSlice.reducer;