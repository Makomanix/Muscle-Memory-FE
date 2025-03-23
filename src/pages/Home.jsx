import { useSelector } from "react-redux";


function HomePage() {
  const user = useSelector((state) => state.user.user)
  console.log(user);

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}

export default HomePage;