import { useState } from "react";

import { replaceString, validateFormData } from "../util/validations";

function SignupPage() {

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  })

  const [ error, setError ] = useState(null)
  const [ inputError, setInputError ] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const isValid = validateFormData(formData)
    setError(isValid.error);
    if ( !isValid.status ) {
      setInputError(isValid.css)
      return
    } else {
      handleSignup()
    }
  }

  async function handleSignup() {
    setError('Submitting')

    try {
      const response = await fetch('http://')
    }
  }

  console.log(error);
  console.log(inputError);

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
    console.log(value)
  };
  
  function handleBlur(e) {
    const name = e.target.name;
    let value = e.target.value;
    
    if ( value.includes(" ") ) {
      value = value.replace(/\s/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
      console.log(value)
    }
  }

  return (
    <>
      <h1>
        Signup
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" onChange={handleChange} onBlur={handleBlur} value={formData.username} minLength={2} required></input>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange} onBlur={handleBlur} value={formData.email} required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange} onBlur={handleBlur} value={formData.password} minLength={7} required></input>
        <label htmlFor="confirmation">Confirm Password:</label>
        <input type="password" id="confirmation" name="confirmation" onChange={handleChange} onBlur={handleBlur} value={formData.confirmation} minLength={7} required></input>
        <button>Signup</button>
      </form>
      { error ? <p>{error}</p> : null }
    </>
  )
}

export default SignupPage;