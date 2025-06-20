import { useSelector } from "react-redux";
import PublicNavigation from "./PublicNavigation";
import AdminNavigation from "./AdminNavigation";
import UserNavigation from "./UserNavigation";

function MainNavigation() {
  const user = useSelector((state) => state.user.user);
  console.log('Main Nav Render')

  function renderNavigation() {
    if ( user.email === null ) {
      return <PublicNavigation />;
    }

    if ( user.role === 'admin' ) {
      return <AdminNavigation />;
    }

    if ( user.role === 'user' )
    return <UserNavigation />;
  };

  return (
    <header>
    <nav>
      { renderNavigation() }
    </nav>
  </header>
  )
}

export default MainNavigation;