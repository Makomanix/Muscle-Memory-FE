import { useRef } from "react";

import WorkoutModal from "../components/WorkoutModal";
import WorkoutCard from "../components/WorkoutCard";

import { useGetWorkoutsQuery } from "../services/MuscleMemoryApi";

function WorkoutPage() {

  const dialog = useRef();
  const { data: workouts, isLoading, error } = useGetWorkoutsQuery();

  console.log('workouts', workouts);

  let workoutCards;

  if (isLoading) {
    workoutCards = <li>Loading Workouts</li>
  } else {
    workoutCards = workouts.map(
      (workout) =>
        <WorkoutCard 
          key={workout._id}
          id={workout._id}
          title={workout.title}
          image={workout.image}
          //type = legs, chest, back
          //is an array of objects
          type={workout.type}
          //sessions is array of objects
          sessions={workout.sessions}    
        />
    )
  }

  function handleOpenModal() {
    dialog.current.showModal();
  }

  function handleCloseModal() {
    dialog.current.close();
  }



  return <>
  <WorkoutModal dialogRef={dialog} modifier={'New'} onClose={handleCloseModal}/>
  <h1>Exercises</h1>
  <button onClick={handleOpenModal}>Add Exercise</button>
  <div>
    <ul>
      { workoutCards }
      { error ? <li>{error}</li> : null }
    </ul>
  </div>
</>
}

export default WorkoutPage;