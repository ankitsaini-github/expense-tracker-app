import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authReducer/authSlice";
import expenseSlice from "./expenseReducer/expenseSlice";

const store = configureStore({
  reducer : { 
    auth: authSlice,
    expenses : expenseSlice,
   },
});

export default store;
