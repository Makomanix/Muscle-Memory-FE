import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function AdminNavigation() {

  return (
    <ul>
      <li><NavLink to='/exercises'>Exercises</NavLink></li>
      <li>
        <LogoutButton />
      </li>
    </ul>
  )
}

export default AdminNavigation;