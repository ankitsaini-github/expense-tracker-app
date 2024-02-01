import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

const Forgotpassword = () => {
  const [isloading,setisloading]=useState(false)
  const history=useHistory()
  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log(e.target.useremail.value)
    const email=e.target.useremail.value;
    try{
      setisloading(true)
      const res=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY',{
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email ,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          console.log("reset link sent successfully ", data);
          window.alert('Sign in with new credentials ')
          history.push('/auth')
        }
      } else {
        const data = await res.json();
        if (data && data.error) {
          console.log("got error ", data.error);
          throw new Error(data.error);
        }
      }
    }catch(err){
      console.log(err)
    }
    setisloading(false)
  }

  return (
    <div className='bg-light d-flex justify-content-center align-items-center w-100 h-100 flex-column'>
      <Form className='border w-25 w-sm-75 p-4 bg-white d-flex flex-column' onSubmit={submitHandler}>
        {isloading?<p>Sending request...</p>:<><span className='fs-3 my-2'>Reset Password</span>
        <span className='fs-6 mt-2'>Enter the email you have registered.</span>
        <FloatingLabel controlId="useremail" label="Email" className='my-3'>
          <Form.Control type="email" placeholder="Email" autoComplete='' required />
        </FloatingLabel>

        <Button variant='primary rounded-pill px-5 my-4' type='submit' size='lg'>Send Link</Button>
        <span>Create a new account ? <Link to='/auth'>SignUp</Link></span></>}
      </Form>
    </div>
  )
}

export default Forgotpassword