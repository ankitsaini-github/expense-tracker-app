import React, { useState } from 'react'
import { Button, Container, Form, Row,Col } from 'react-bootstrap'


const ExpenseForm=(props)=>{
  const submithandler=(e)=>{
    e.preventDefault();
    const newexpense={
      price:Number(e.target.eprice.value),
      description:e.target.edescription.value,
      category:e.target.ecategory.value,
      eid: "eid_"+Math.random().toString(16).slice(2),
    }
    props.onAddExpense(newexpense)
    console.log(newexpense)
  }
return(
  <Form onSubmit={submithandler} className='px-5 py-4 border shadow-sm mt-4 fs-5 d-flex flex-column bg-white'>
      <span className='fs-4 border-bottom pb-3'>Add New Expense</span>
      <Form.Group className="my-3 text-start" controlId="eprice">
        <Form.Label>Expense Cost</Form.Label>
        <Form.Control type="number" placeholder="Money Spent" required/>
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="edescription">
        <Form.Label>Expense Description</Form.Label>
        <Form.Control type="text" placeholder="Description" required/>
      </Form.Group>
      <Form.Group className="mb-3 text-start" controlId="ecategory">
        <Form.Label>Expense Description</Form.Label>
        <Form.Select aria-label="Select Expense Category">
          <option disabled>Select Expense Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Rent">Rent</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      <Button variant='primary my-2 mx-auto' size='md' type='submit'>Add Expense</Button>
  </Form>
)
}
const ExpenseList=(props)=>{
return(
  <div className='px-5 py-4 border shadow-sm mt-4 fs-5 d-flex flex-column bg-white'>
    <span className='fs-4 border-bottom pb-3'>My Expenses</span>
    <div>
      <Row md={3} className='p-2 text-white fw-bold text-start' style={{backgroundColor:'rgb(32, 201, 151)'}} >
        <Col>Catagory</Col>
        <Col>Description</Col>
        <Col>Price</Col>
      </Row>
      {
        props.expenses.map((item)=>(
          <Row md={3} key={item.eid} className='py-2 border-bottom text-start'>
            <Col>{item.category}</Col>
            <Col>{item.description}</Col>
            <Col>{item.price}</Col>
          </Row>
        ))
      }
    </div>
  </div>
)
}
const Expense = () => {
  const [expenses,setexpenses]=useState([]);
  const addExpenseHandler=(newexpense)=>{
    setexpenses(prev=>[newexpense,...prev])
  }
  return (
    <Container>
      <ExpenseForm onAddExpense={addExpenseHandler}/>
      <ExpenseList expenses={expenses}/>
    </Container>
  )
}

export default Expense