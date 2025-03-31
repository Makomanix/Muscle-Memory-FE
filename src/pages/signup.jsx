import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { replaceString, validateSignupData } from "../util/validations";

function SignupPage() {

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  })

  const [ errorMessage, setErrorMessage ] = useState(null)
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateSignupData(formData)
    setErrorMessage(isValid.message);
    if ( !isValid.status ) {
      setErrorMessage(isValid.css)
      return
    } else {
      handleSignup()
    }
  }

  async function handleSignup() {
    setErrorMessage('Submitting')

    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if ( res.status === 422 ) {
        console.log('status 422')
        throw new Error(
          "Signup failed. Email already exists!"
        )
      };
      
      if ( res.status !== 200 && res.status !== 201) {
        throw new Error('Creating a user failed!')
      };
      
      const data = await res.json();
      navigate('/login', { replace: true })
      return data;

    } catch (error){
      console.log('error', error);
      setErrorMessage(error.message);
    }
  };

  //control form inputs
  function handleChange(e) {
    let { name, value } = e.target;
    value = replaceString(value)
    if ( name === 'email') {
      value = value.toLowerCase()
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(errorMessage)

  return (
    <>
      <h1>
        Signup
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" onChange={handleChange}  value={formData.username} minLength={2} required></input>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange}  value={formData.email} required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange}  value={formData.password} minLength={7} required></input>
        <label htmlFor="confirmation">Confirm Password:</label>
        <input type="password" id="confirmation" name="confirmation" onChange={handleChange}  value={formData.confirmation} minLength={7} required></input>
        <button>Signup</button>
      </form>
      { errorMessage ? <p>{errorMessage}</p> : null }
    </>
  )
}

export default SignupPage;