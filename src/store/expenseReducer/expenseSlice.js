import { createSlice } from "@reduxjs/toolkit";

const initialState={
  expenses:[],
}

const expenseSlice=createSlice({
  name:'userExpense',
  initialState,
  reducers:{
    addExpense:(state,action)=>{
      state.expenses.push(action.payload)
    },
    setExpense:(state,action)=>{
      state.expenses=action.payload;
    },
    deleteExpense:(state,action)=>{
      state.expenses=state.expenses.filter((i)=>i.id!==action.payload)
    },
    updateExpense:(state,action)=>{
      const index=state.expenses.findIndex((i)=>i.id===action.payload.id)
      state.expenses[index]={...action.payload.updatedexpense, id:action.payload.id}
    }
  }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;