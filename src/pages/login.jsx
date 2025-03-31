import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { replaceString } from "../util/validations";
import { usePostLoginMutation } from "../services/MuscleMemoryApi";
import { setStorageUser } from "../util/sessionStorage";
import { setUser } from "../store/userSlice";

function LoginPage() {
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ postLogin, {isLoading, error} ] = usePostLoginMutation();

  async function handleLogin(e) {
    e.preventDefault();
    await postLogin(formData)
      .unwrap()
      .then((user) => {
        console.log('fulfilled', user)
        setStorageUser(user);
        dispatch(setUser(user));
        if (user.role === 'admin') {
          navigate('/exercises', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      })
      // .catch((error) => console.log('rejected', error.data.message));

  }

  
  
  //control form inputs
  function handleChange(e) {
    let { name, value } = e.target;
    value = replaceString(value);   
    if ( name === 'email') {
      value = value.toLowerCase();
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
        <input type="text" id="email" name="email" onChange={handleChange}  value={formData.email} required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleChange}  value={formData.password} required></input>
        <button>Login</button>
      </form>
      {isLoading ? 
        <p>Logging in...</p> : error ? 
          <p>{error.data.message}</p> : null}
    </>
  )
}

export default LoginPage;
