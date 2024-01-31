import React, { useRef, useState } from 'react'
import { Button, Form,Row,Col } from 'react-bootstrap'

const Home = () => {
  const [updateform,setupdateform]=useState(false)
  const newname=useRef(null);
  const newprofileurl=useRef(null);
  const updatetoggler=() => {
    setupdateform((prev) => !prev)
  }

  const url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY'
  const token=localStorage.getItem('usertoken')

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewname = newname.current.value;
    const photourl=newprofileurl.current.value;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        displayName: enteredNewname,
        photoUrl: photourl,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      window.alert('Profile updated')
    });
  }

  return (
    <div className='w-100 d-flex flex-column align-items-center'>
      <div className='border p-3 d-flex justify-content-between align-items-center w-100'>
        <span className='fs-4'>Welcome to Expense Tracker !!!</span>
        <Button variant='warning rounded-pill px-4 py-1' onClick={updatetoggler}>Your profile is incomplete. <strong className='text-primary'>Complete now</strong></Button>
      </div>
      {updateform && <Form className='w-75 my-5 border-bottom border-2 p-3' onSubmit={submitHandler}>
        <div className='d-flex justify-content-between mb-4'>
          <span className='fw-bold fs-4'>Contact Details</span>
          <span><Button variant='outline-danger fw-bold'>Cancel</Button></span>
        </div>
        <Row className='my-3'>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="userfullname">
              <Form.Label column sm="5" className='fw-bold fs-5'>
                Full Name
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" placeholder="Full name" ref={newname}/>
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="userprofileurl">
              <Form.Label column sm="5" className='fw-bold fs-5'>
                Profile Photo Url
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" placeholder="" ref={newprofileurl}/>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <div className='w-100'>
          <Button variant='danger float-start' type='submit'>Update</Button>
        </div>
      </Form>}
    </div>
  )
}

export default Home