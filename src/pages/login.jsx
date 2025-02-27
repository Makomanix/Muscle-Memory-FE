import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { replaceString } from "../util/validations";

function LoginPage() {

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const [ errorMessage, setErrorMessage ] = useState(null)
  const navigate = useNavigate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setErrorMessage('Submitting');
  //   handleLogin()
  // }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      console.log(res);
      if ( res.status !== 200 ) {
        throw new Error(
          "Invalid Email or Password!"
        )
      }
      const data = await res.json();
      console.log(data);
      // navigate( '/', { replace: true } )
    } catch (error){
      setErrorMessage(error);
    }
  }

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


  return (
    <>
      <h1>
        Login
      </h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange} onBlur={handleBlur} value={formData.email} required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange} onBlur={handleBlur} value={formData.password} required></input>
        <button>Signup</button>
      </form>
    </>
  )
}

export default LoginPage;