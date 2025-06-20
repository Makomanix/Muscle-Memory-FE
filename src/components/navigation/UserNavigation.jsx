import { NavLink } from "react-router-dom";
import { usePrefetch } from "../../services/MuscleMemoryApi"
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";


function UserNavigation() {
  const user = useSelector((state) => state.user.user);

  const prefetchExercises = usePrefetch('getExercises');
  const prefetchWorkouts = usePrefetch('getWorkouts');

  console.log("User Navigation")
    
    prefetchExercises();
    prefetchWorkouts(user.userId);
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