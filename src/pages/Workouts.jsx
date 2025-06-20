import { useRef, useState } from "react";
import WorkoutModal from "../components/WorkoutModal";
import WorkoutCard from "../components/WorkoutCard";

import { useGetWorkoutsQuery } from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";
import { getStorageUser } from "../util/sessionStorage";

function WorkoutPage() {

  const dialog = useRef();
  const [ shouldRenderModal, setShouldRenderModal ] = useState(false);

  const user = useSelector((state) => state.user.user);

  //Getting userId from Redux state or fallback to sessionStorage
  const userId = user?.userId || getStorageUser()?.userId;

  //Skip to prevent renders when logging out
  const { data: workouts, isLoading, error } = useGetWorkoutsQuery(userId, {skip: !userId}); 

  let workoutCards;
  console.log('When does Workouts Render');

  if ( isLoading ) {
    workoutCards = <li>Loading Workouts</li>
  } else if ( error ) {
    console.log('ERROR', error);
    workoutCards = <li>{error.status}</li>;
  } else {
    console.log("Are these workouts?", workouts);
    workoutCards = workouts?.map(
      (workout) =>
        <WorkoutCard 
          key={workout._id}
          id={workout._id}
          title={workout.title}
          image={workout.image}
          // type is an array strings
          type={workout.type}
          exercises={workout.exercises}
          //sessions is array of objects
          sessions={workout.sessions}    
        />
    )
  }

  function handleOpenModal() {
    setShouldRenderModal(true)
    setTimeout(() => {
      dialog.current.showModal();
    }, 1)
  }

  function handleCloseModal() {
    setShouldRenderModal(false)
    dialog.current.close();
  }

  return <>
    {
      shouldRenderModal && 
        <WorkoutModal dialogRef={dialog} modifier={'New'} onClose={handleCloseModal}/> 
    }

    <h1>Workouts</h1>
    <button onClick={handleOpenModal}>Add Workouts</button>
    <div>
      <ul>
        { workoutCards }
      </ul>
    </div>
</>
}

export default WorkoutPage;