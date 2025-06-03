import { useLogout } from "../../util/useLogout";


function LogoutButton() {
  const handleLogout = useLogout();
  
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton;