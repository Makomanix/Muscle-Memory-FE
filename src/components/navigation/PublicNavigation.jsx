import { NavLink} from "react-router-dom";

function PublicNavigation() {

  return (
    <ul>
      <li><NavLink to='/preview'>Muscle-Memory</NavLink></li>
      <li><NavLink to='/login'>Login</NavLink></li>
      <li><NavLink to='/signup'>Signup</NavLink></li>
    </ul>
  )
}

export default PublicNavigation;