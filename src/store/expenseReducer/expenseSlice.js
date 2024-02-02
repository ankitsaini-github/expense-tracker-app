import { createSlice } from "@reduxjs/toolkit";

const initialState={
  expenses:[],
  showpro:false,
  totalamount:0,
}

const expenseSlice=createSlice({
  name:'userExpense',
  initialState,
  reducers:{
    addExpense:(state,action)=>{
      state.expenses.push(action.payload)
      state.totalamount+=action.payload.price
      state.showpro=state.totalamount>10000;
    },
    setExpense:(state,action)=>{
      state.expenses=action.payload;
      state.totalamount=action.payload.reduce((acc,cur)=>acc+cur.price,0)
      state.showpro=state.totalamount>10000;
    },
    deleteExpense:(state,action)=>{
      const deletedexpense=state.expenses.find((i)=>i.id===action.payload)
      state.expenses=state.expenses.filter((i)=>i.id!==action.payload)
      state.totalamount-=deletedexpense.price;
      state.showpro=state.totalamount>10000;
    },
    updateExpense:(state,action)=>{
      const index=state.expenses.findIndex((i)=>i.id===action.payload.id)
      state.totalamount=state.totalamount-state.expenses[index].price+action.payload.updatedexpense.price;
      state.expenses[index]={...action.payload.updatedexpense, id:action.payload.id}
      state.showpro=state.totalamount>10000;
    }
  }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;