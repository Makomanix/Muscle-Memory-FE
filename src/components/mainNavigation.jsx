import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MainNavigation() {

  const token = useSelector((state) => state.token.token)

  const links = token ? 
    <ul>
      <li><NavLink to='/' end>Home</NavLink></li>
      <li><NavLink to='/exercises'>Exercises</NavLink></li>
      <li><NavLink to='/workouts'>Workouts</NavLink></li>
      <li><NavLink to='/sessions'>Sessions</NavLink></li>
    </ul>
    :
    <ul>
        <li><NavLink to='/preview'>Muscle-Memory</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/signup'>Signup</NavLink></li>
    </ul>


  return <header>
    <nav>
      { links }
    </nav>
  </header>
}

export default MainNavigation;