import { useState } from "react";
import { useDispatch } from "react-redux";
import ExerciseButton from "./ExerciseButton";
import ExerciseCard from "./ExerciseCard";

function ExerciseSelector({mode, allExercises, currentExercises, onSelect}) {

  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ showCard, setShowCard ] = useState(null)
  const [ displayedExercise, setDisplayedExercise ] = useState(null);

  function displayExercise(exercise) {
    if(exercise.id === displayedExercise.id) {
      setShowCard(null);
    } else {
      setDisplayedExercise(exercise);
    }
  }

  function addExercise(exercise) {
    console.log(exercise)
    
  }

  function removeExercise(exercise) {
    console.log(exercise);
  }

  function filterExercises(exercise) {
    currentExercises ? currentExercises.filter((curExercise) => curExercise._id === exercise._id ) : false
  }
  
  function handleExercise(exercise) {
    if (isOpen) {
      let included = filterExercises(exercise)
      if (included && included.length > 0) {
        removeExercise(exercise);
      } else {
        addExercise(exercise);
      }
    }
    if (!isOpen) {
      displayExercise(exercise);
    }
  }

  const currentExerciseButtons = currentExercises?.map((exercise) => {
    return (
      <ExerciseButton key={exercise._id} exercise={exercise} handleClick={handleExercise}/>
    )
  });
  
  const allExerciseButtons = allExercises?.map((exercise) => {
    return (
      <ExerciseButton key={exercise._id} exercise={exercise} handleClick={handleExercise}/>
    );
  });
  
  
  console.log('IS OPEN', isOpen)
  console.log('ALL EXERCISES / True', allExercises);
  console.log('ALL BUTTONS', allExerciseButtons);
  console.log('CURRENT EXERCISES False', currentExercises);
  console.log('CURRENT BUTTONS', currentExerciseButtons);


  return (<>
    {!isOpen ?
      <div>
        <h2>Included Exercises</h2>
        <div>
          <ul>
            {currentExerciseButtons}
          </ul>
        </div>
        <div>
          {
            showCard &&
            <ExerciseCard id={displayedExercise.id} name={displayedExercise.name} primaryMuscle={displayedExercise.primaryMuscle} secondaryMuscle={displayedExercise.secondaryMuscle} videoUrl={displayedExercise.videoUrl} canSelect={true}/>
          }
        </div>
          <div>
            <button onClick={() => setIsOpen(true)}>Change Exercises</button>
          </div>
      </div>
      :
      <div>
        <div>
          <p>Add/Remove Exercises</p>
          <ul>
            {allExerciseButtons}
          </ul>
        </div>
        <div>
          {
            showCard &&
            <ExerciseCard id={displayedExercise.id} name={displayedExercise.name} primaryMuscle={displayedExercise.primaryMuscle} secondaryMuscle={displayedExercise.secondaryMuscle} videoUrl={displayedExercise.videoUrl} canSelect={true}/>
          }
        </div>
        <div>
          <button onClick={() => setIsOpen(false)}>Confirm Changes</button>
        </div>
      </div> 
    }
    <button>Edit</button>
  </>
  )
}

export default ExerciseSelector;