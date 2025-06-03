import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";


function UserNavigation() {


  return (
    <ul>
      <li><NavLink to='/' end>Home</NavLink></li>
      <li><NavLink to='/exercises'>Exercises</NavLink></li>
      <li><NavLink to='/workouts'>Workouts</NavLink></li>
      <li><NavLink to='/sessions'>Sessions</NavLink></li>
      <li>
        <LogoutButton />
      </li>
    </ul>
  )
}

export default UserNavigation;