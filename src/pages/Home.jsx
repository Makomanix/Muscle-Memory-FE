// import { useSelector } from "react-redux";

import { getStorageUser } from "../util/sessionStorage";


function HomePage() {
  let user = getStorageUser();
  console.log(user);
  // const user = useSelector((state) => state.user.user)
  // console.log(user);

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}

export default HomePage;