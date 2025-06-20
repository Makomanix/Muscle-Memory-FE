// import { useSelector } from "react-redux";

import { getStorageUser } from "../util/sessionStorage";
// import { useGetExercisesQuery, useGetWorkoutsQuery, usePrefetch } from "../services/MuscleMemoryApi";

function HomePage() {
  let user = getStorageUser();
  console.log("homepage user", user);

  // const { data: exercises } = useGetExercisesQuery();
  // const { data: workouts } = useGetWorkoutsQuery();
  // const prefetchExercises = usePrefetch('getExercises');
  // const prefetchWorkouts = usePrefetch('getWorkouts');
  // const user = useSelector((state) => state.user.user)
  // console.log(user);

  return (
    <>
      <h1>Home Page</h1>
    </>
  )
}

export default HomePage;