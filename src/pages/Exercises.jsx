import { useRef } from "react";

import ExerciseModal from "../components/exerciseModal";
import ExerciseCard from "./ExerciseCard";

import { useGetExercisesQuery } from "../services/MuscleMemoryApi";


function ExercisesPage() {
  const dialog = useRef();
  const {data: exercises, isLoading, error  } = useGetExercisesQuery();

  console.log('exercises', exercises);

  let exerciseCards;
  
  if(isLoading) {
    exerciseCards = <li>Loading Exercises</li>
  } else {
    exerciseCards = exercises.map(
      (exercise) => 
        <ExerciseCard
          key={exercise._id}
          id={exercise._id}
          name={exercise.name} 
          primaryMuscle={exercise.primaryMuscle} 
          secondaryMuscle={exercise.secondaryMuscle} 
          videoUrl={exercise.videoUrl}/>
    )
  }

  function handleOpenModal() {
    dialog.current.showModal();
  }

  function handleCloseModal() {
    dialog.current.close();
  }


  return <>
    <ExerciseModal ref={dialog} modifier={'New'} onClose={handleCloseModal}/>
    <h1>Exercises</h1>
    <button onClick={handleOpenModal}>Add Exercise</button>
    <div>
      <ul>
        {exerciseCards}
      </ul>
    </div>
  </>
}

export default ExercisesPage;