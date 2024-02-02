import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { expenseActions } from '../../store/expenseReducer/expenseSlice';

const ExpenseForm=(props)=>{
  const eprice=useRef()
  const edesc=useRef()
  const ecat=useRef()
  const inputedits=()=>{
    eprice.current.value=props.item.price;
    edesc.current.value=props.item.description;
    ecat.current.value=props.item.category;
  }
  const resetinputs =()=>{
    eprice.current.value='';
    edesc.current.value='';
    ecat.current.value='';
  }
  const submithandler=(e)=>{
    e.preventDefault();
    const newexpense={
      price:Number(e.target.eprice.value),
      description:e.target.edescription.value,
      category:e.target.ecategory.value,
    }
    if(props.showEditor){
      props.onEditExpense(props.item.id,newexpense)
    }else{
      props.onAddExpense(newexpense)
    }
    console.log(newexpense)
    e.target.eprice.value=''
    e.target.edescription.value=''
    e.target.ecategory.value=''
  }
return(
  <Form onSubmit={submithandler} className='px-5 py-4 border shadow-sm mt-4 fs-5 d-flex flex-column bg-white'>
      <span className='fs-4 border-bottom pb-3'>{props.showEditor?<>Edit Expense</>:<>Add New Expense</>}</span>
      {props.showEditor && inputedits()}
      <Form.Group className="my-3 text-start" controlId="eprice">
        <Form.Label>Expense Cost</Form.Label>
        <Form.Control type="number" placeholder="Money Spent" required ref={eprice}/>
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="edescription">
        <Form.Label>Expense Description</Form.Label>
        <Form.Control type="text" placeholder="Description" required ref={edesc}/>
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="ecategory">
        <Form.Label>Expense Description</Form.Label>
        <Form.Select aria-label="Select Expense Category" defaultValue='' ref={ecat}>
          <option value='' disabled>Select Expense Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Rent">Rent</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      {props.showEditor && <Button variant='secondary my-2 mx-auto' size='md' onClick={()=>{props.onCancel();resetinputs()}}>Cancel</Button>}
      <Button variant='primary my-2 mx-auto' size='md' type='submit'>{props.showEditor?<>Update</>:<>Add Expense</>}</Button>
  </Form>
)
}
const ExpenseList=(props)=>{
  const {totalamount}=useSelector(state=>state.expenses)
  const editclicked=(item)=>{
    props.onEditClick(item)
  }
  const deleteclicked=(id)=>{
    if(window.confirm('Want to Delete ?'))
    {props.onDelete(id)}
  }
return(
  <div className='px-5 py-4 border shadow-sm my-4 fs-5 d-flex flex-column bg-white'>
    <span className='fs-4 border-bottom pb-3 d-flex flex-column flex-lg-row justify-content-between'><h2>My Expenses</h2> <p>Total : Rs {totalamount}</p></span>
    {props.expenses.length===0?<p className='mt-2 text-secondary'>No Expense Listed</p>:<div>
      <Row md={4} className='p-2 text-white fw-bold text-start' style={{backgroundColor:'rgb(32, 201, 151)'}} key={'list-header'}>
        <Col md={4}>Catagory</Col>
        <Col md={4}>Description</Col>
        <Col md={2}>Price</Col>
        <Col md={2}><span className='float-end me-1'>Action</span></Col>
      </Row>
      {
        props.expenses.map((item)=>(
          <Row md={4} key={'e_'+item.id} className='py-2 border-bottom text-start'>
            <Col md={4}>{item.category}</Col>
            <Col md={4}>{item.description}</Col>
            <Col md={2}>{item.price}</Col>
            <Col md={2} >
              <span className='float-end me-1'>
                <Button variant='secondary me-1' size='sm' onClick={editclicked.bind(null,item)}>Edit</Button>
                <Button variant='danger ' size='sm' onClick={deleteclicked.bind(null,item.id)}>X</Button>
              </span>
            </Col>
          </Row>
        ))
      }
    </div>}
  </div>
)
}


const Expense = () => {
  const {userid}=useSelector(state=>state.auth)
  const {expenses}=useSelector(state=>state.expenses)
  const dispatch=useDispatch()
  // const [expenses,setexpenses]=useState([]);
  // const userid=window.localStorage.getItem('userid');
  const [expenseEditor,setExpenseEditor]=useState(false);
  const [editexpense,seteditexpense]=useState({})

  const url=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/userinfo/${userid}/expenses.json`

  useEffect(()=>{
    const getuserexpenses=async()=>{
      try{
        const response=await fetch(url)
      if(response.ok){
        const data=await response.json()
        if(data){
          console.log('got expense data : ',data)
          const loadedexpense=[]
          for (const key in data){
            loadedexpense.push({
              id:key,
              price:data[key].price,
              description:data[key].description,
              category:data[key].category
            })
          }
          // setexpenses(loadedexpense)
          dispatch(expenseActions.setExpense(loadedexpense))
        }
      }
      }catch(err){
        console.log(err)
      }
    }
    getuserexpenses();
  },[url,dispatch])

  const addExpenseHandler=async(newexpense)=>{
    try{
      const response=await fetch(url,{
        method:'POST',
        body: JSON.stringify(newexpense),
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      if(!response.ok){
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log('added : ',data);

      dispatch(expenseActions.addExpense(newexpense))
      // setexpenses(prev=>[...prev,newexpense])
    }catch(err){
      console.log(err)
    }
    // setexpenses(prev=>[newexpense,...prev])
  }

  const editExpenseHandler=async(expenseid,updatedexpense)=>{
    const url=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/userinfo/${userid}/expenses/${expenseid}.json`
    try{
      const response=await fetch(url,{
        method:'PUT',
        body: JSON.stringify(updatedexpense),
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      if(!response.ok){
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log('updated : ',data);
      // const index=expenses.findIndex((i)=>i.id===expenseid)
      // const newarr=[...expenses]
      // newarr[index]={...updatedexpense,id:expenseid}

      dispatch(expenseActions.updateExpense({
        id:expenseid,
        updatedexpense:updatedexpense
      }))
      // setexpenses(newarr)
      setExpenseEditor(false)
    }catch(err){
      console.log(err)
    }
    // setexpenses(prev=>[newexpense,...prev])
  }

  const deleteExpenseHandler=async(expenseid)=>{
    const url=`https://react-prep-2265-default-rtdb.asia-southeast1.firebasedatabase.app/userinfo/${userid}/expenses/${expenseid}.json`
    try{
      const response=await fetch(url,{
        method:'DELETE',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      if(!response.ok){
        console.log('got error ....')
        throw new Error('Something went wrong!');
      }

      dispatch(expenseActions.deleteExpense(expenseid))
      // const newarr=expenses.filter((i)=>i.id!==expenseid)
      // setexpenses(newarr)
      console.log('Deleted expense')
    }catch(err){
      console.log(err)
    }
  }

  const editformhandler=(editexpense)=>{
    setExpenseEditor(true)
    seteditexpense(editexpense)
    console.log('edit expense :',editexpense)
  }
  return (
    <Container className=''>
      <ExpenseForm onAddExpense={addExpenseHandler} onEditExpense={editExpenseHandler} showEditor={expenseEditor} item={editexpense} onCancel={()=>{setExpenseEditor(false)}}/>
      <ExpenseList expenses={expenses} onEditClick={editformhandler} onDelete={deleteExpenseHandler}/>
    </Container>
  )
}

export default Expense