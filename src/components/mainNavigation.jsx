import { NavLink, useNavigate } from "react-router-dom";
import { clearStorageUser } from "../util/sessionStorage";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";


function MainNavigation() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log(user)

  function handleLogout() {
    clearStorageUser();
    dispatch(clearUser());
    navigate('/preview', { replace: true })
  }

  const links = user.email === null ?
    <ul>
        <li><NavLink to='/preview'>Muscle-Memory</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
    </ul>
      : user.role === 'admin' ?
    <ul>
      <li><NavLink to='/exercises'>Exercises</NavLink></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </ul> 
      :
    <ul>
      <li><NavLink to='/' end>Home</NavLink></li>
      <li><NavLink to='/exercises'>Exercises</NavLink></li>
      <li><NavLink to='/workouts'>Workouts</NavLink></li>
      <li><NavLink to='/sessions'>Sessions</NavLink></li>
      <li><button onClick={handleLogout}>Logout</button></li>
    </ul>


  return <header>
    <nav>
      { links }
    </nav>
  </header>
}

export default MainNavigation;