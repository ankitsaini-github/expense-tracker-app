import React, { useRef, useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Auth = () => {
  const [login,setlogin]=useState(false)
  // const [isloading,setisloading]=useState(false)
  const useremail=useRef(null)
  const password=useRef(null)
  const confirmpassword=useRef(null)
  const history=useHistory()

  const logintoggler=()=>{
    setlogin(prev=>!prev)
  }
  const submitHandler= async(e)=>{
    e.preventDefault();
    const enteredemail=useremail.current.value;
    const enteredpassword=password.current.value;
    const confirmation=login?null:confirmpassword.current.value;

    if(!login && enteredpassword!==confirmation){
      window.alert('Password do not match !!!')
      return;
    }

    let url;
    if(login){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY';
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY';
    }
    try{
      const res = await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          email: enteredemail,
          password: enteredpassword,
          returnSecureToken: true,
        }),
        headers:{
          "Content-Type": "application/json",
        },
      })
      if(res.ok){
        const data=await res.json();
        if(data){
          localStorage.setItem('usertoken',data.idToken)
          localStorage.setItem('userid',data.localId)
          console.log('login success ',data)
          window.alert('login success ')
          history.replace('/profile')
        }
      }
      else{
        const data= await res.json();
        let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
      }

    }catch(error){
      console.log(error.message)
      window.alert(error.message)
    }
  }

  const resetpasswordhandler=() => { 
    history.push('/auth/forgot-password')
   }

  return (
    <div className='bg-light d-flex justify-content-center align-items-center w-100 h-100 flex-column'>
      <Form className='border w-25 w-sm-75 p-4 bg-white' onSubmit={submitHandler}>
        <span className='fs-3 my-2'>{login?<>LogIn</>:<>SignUp</>}</span>
        <FloatingLabel controlId="useremail" label="Email" className='my-3'>
          <Form.Control type="email" placeholder="Email" autoComplete='' required ref={useremail}/>
        </FloatingLabel>
        <FloatingLabel controlId="userpassword" label="Password" className='my-3'>
          <Form.Control type="password" placeholder="Password" autoComplete='' required ref={password}/>
        </FloatingLabel>
        {!login && <FloatingLabel controlId="userconfirmpassword" label="Confirm Password" className='my-3'>
          <Form.Control type="password" placeholder="Password" autoComplete='' required ref={confirmpassword}/>
        </FloatingLabel>}
        {login && <p className='text-secondary ' style={{cursor:'pointer'}} onClick={resetpasswordhandler}>Forgot password ?</p>}
        <Button variant='primary rounded-pill px-5 my-4' type='submit' size='lg'>{login?<>Log In</>:<>Sign Up</>}</Button>
      </Form>
      <Button variant='outline-success mt-4 text-success' style={{backgroundColor:'rgb(209, 231, 221)'}} onClick={logintoggler}>{login?<>Create new account? SignUp</>:<>Have an account? LogIn</>}</Button>
    </div>
  )
}

export default Auth