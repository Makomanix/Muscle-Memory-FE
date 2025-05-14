import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { replaceString, validateSignupData } from "../util/validations";
import { useCreateUserMutation } from "../services/MuscleMemoryApi";

function SignupPage() {

  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  })

  const [ createUser ] = useCreateUserMutation();

  const [ errorMessage, setErrorMessage ] = useState({ message: null, details: [] });
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
    
    const newUser = {
      email: formData.email,
      username: formData.username,
      password: formData.password
    }
    
    try {
      await createUser(newUser).unwrap();

      navigate('/login', { replace: true })
        
    } catch (err){
      console.error('error', err);
      console.log(err.data.details);
      setErrorMessage({ message: err.data.message, details: err.data.details});
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
      { errorMessage.message ?
        <div>
          <p>{errorMessage.message}</p>
        </div>
      : null }
      { errorMessage.details ?
        <div>
          {errorMessage.details.map((detail) => {
            return <p key={detail}>{detail}</p>
          })} 
        </div>
      : null }
    </>
  )
}

export default SignupPage;