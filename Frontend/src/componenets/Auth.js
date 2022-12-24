import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'


const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setisSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      })
      .catch(err => console.log(err))

    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignup) {
      sendRequest('signup')
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data))
    } else {
      sendRequest()
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'))
        .then((data) => console.log(data));
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400} display="flex" flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' marginTop={5} borderRadius={5}>
          <Typography variant='h2' textAlign='center'>{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && <TextField placeholder='Enter Name' value={inputs.name} name='name' onChange={handleChange} margin='normal' />
          }
          <TextField placeholder='Enter Email' value={inputs.email} type={'email'} name='email' onChange={handleChange} margin='normal' />
          <TextField placeholder='Enter Password' value={inputs.password} type={'password'} name='password' onChange={handleChange} margin='normal' />
          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
          <Button onClick={() => setisSignup(!isSignup)} sx={{ borderRadius: 3, marginTop: 3 }}>Switch to {isSignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth