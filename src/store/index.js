import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authReducer/authSlice";
import expenseSlice from "./expenseReducer/expenseSlice";
import themeSlice from "./themeReducer/themeSlice";

const store = configureStore({
  reducer : { 
    auth: authSlice,
    expenses : expenseSlice,
    theme : themeSlice,
   },
});

export default store;
