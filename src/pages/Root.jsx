import { Outlet } from "react-router-dom";
import MainNavigation from "../components/mainNavigation";

function RootLayout() {
  return <>
    <MainNavigation />
    <Outlet />
  </>
}

export default RootLayout;