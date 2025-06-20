import { useRef } from "react";

import ExerciseModal from "../components/exerciseModal";
import ExerciseCard from "../components/ExerciseCard";

import { useGetExercisesQuery } from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";


function ExercisesPage() {
  const dialog = useRef();
  const {data: exercises, isLoading, error  } = useGetExercisesQuery();
  const user = useSelector((state) => state.user.user);

  let exerciseCards;
  
  if(isLoading) {
    exerciseCards = <li>Loading Exercises</li>
  } else {
    exerciseCards = exercises?.map(
      (exercise) => 
        <ExerciseCard
          key={exercise._id}
          id={exercise._id}
          name={exercise.name} 
          primaryMuscle={exercise.primaryMuscle} 
          secondaryMuscle={exercise.secondaryMuscle} 
          videoUrl={exercise.videoUrl}
          canEdit={false}/>
    )
  }

  function handleOpenModal() {
      dialog.current.showModal();
  }

  function handleCloseModal() {
    dialog.current.close();
  }


  return <> 
    <ExerciseModal dialogRef={dialog} modifier={'New'} onClose={handleCloseModal} />
    <h1>Exercises</h1>
    {user.role === 'admin' ? <button onClick={handleOpenModal}>Add Exercise</button> : null }
    <div>
      <ul>
        { exerciseCards }
        { error ? <li>{error.message}</li> : null }
      </ul>
    </div>
  </>
}

export default ExercisesPage;