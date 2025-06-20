import { useRef, useState} from "react"
import { uppercaseFirstLetter } from "../util/validations";
import { useDeleteWorkoutMutation, usePatchWorkoutMutation, usePostWorkoutMutation, useGetExercisesQuery} from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";
import ExerciseSelector from "./ExerciseSelector";
import workoutPng from "../assets/icons/workout.png"

function WorkoutModal({dialogRef, onClose, modifier, id, workoutTitle, workoutImage, workoutType, workoutExercises}) {
  const [ localError, setLocalError ] = useState(null);

  const [ postWorkout, { isLoading: loadPost } ] = usePostWorkoutMutation();
  const [ patchWorkout, { isLoading: loadPatch } ] = usePatchWorkoutMutation();
  const [ deleteWorkout, { isLoading: loadDelete } ] = useDeleteWorkoutMutation();
  const { data: allExercises, isLoading: loadExercises, error: exerciseError  } = useGetExercisesQuery();
  
  const workoutBuilder = useSelector((state) => state.workoutBuilder.workoutBuilder);
  const user = useSelector((state) => state.user.user);

 
    <button onClick={handleDelete} disabled={loadDelete}>
      {loadDelete ? 'Deleting...' : 'Delete'}
    </button> 

  const titleRef = useRef();
  // const imageRef = useRef();
  const typeRef = useRef({});
  // const exercisesRef = useRef({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    //capturing workout form info and creating object to send in req.
    const title = uppercaseFirstLetter(titleRef.current.value);
    const type = uppercaseFirstLetter(typeRef.current.value);

    const workout = {
      title,
      image: workoutImage ? workoutImage : workoutPng,
      type,
      exercises: [], //filled with exercises
      sessions: [], //filled with sessions
      userId: user.id
    };

    //post/patch workouts
    try {
      if (modifier === "New") {
        await postWorkout(workout).unwrap();   
      } else {
        await patchWorkout({ ...workout, workoutId: id}).unwrap();
      }
      onClose();  
    } catch (err) {
      console.error('Failed to submit:', err)
      setLocalError(err.data?.message || 'An error occurred while submitting');
    }
  };

  async function handleDelete() {
    setLocalError(null);
    try {
      await deleteWorkout(id).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to delete:', err);
      if (err.status === 404) {
        setLocalError('Workout not found or already deleted');
      } else {
        setLocalError(err.data?.message || 'An error occurred while deleting');
      }
    }
  };

  if ( exerciseError ) {
    console.log('EXERCISE ERROR')
  }

  if ( modifier === 'New') {
    console.log('opened NEW')
    return (
      <dialog ref={dialogRef}>
        <div>
          <h2>{modifier} Workout</h2>
          <form onSubmit={handleSubmit}>

            <label>Workout Title</label>
            <input ref={titleRef} defaultValue={workoutBuilder.title || ''}></input>

            <label>Workout Type</label>
            <input ref={typeRef} defaultValue={workoutBuilder.type || ''}></input>

            <label>Exercises</label>

            { loadExercises ? 
              <p>Loading Exercises</p> : 
              <ExerciseSelector allExercises={allExercises} currentExercises={workoutBuilder.exercises}/>
            } 

            <button type="submit" disabled={loadPost || loadPatch}>
              {loadPost || loadPatch ? 'Submitting...' : 'Submit'}
            </button>
            
          </form>

          <button onClick={onClose}>Close</button>
          {localError && (
            <div>
              {localError}
            </div>
          )}
        </div>
      </dialog>
    )
  }

  console.log('opened Edit')
  return (
    <dialog ref={dialogRef}>
      <div>
        <h2>{modifier} Workout</h2>
        <form onSubmit={handleSubmit}>

          <label>Workout Title</label>
          <input ref={titleRef} defaultValue={workoutTitle}></input>

          <label>Workout Type</label>
          <input ref={typeRef} defaultValue={workoutType}></input>

          <label>Exercises</label>
          { loadExercises ? 
            <p>Loading Exercises</p> : 
            <ExerciseSelector allExercises={allExercises} currentExercises={workoutExercises}/>
          }

          <button type="submit" disabled={loadPost || loadPatch}>
            {loadPost || loadPatch ? 'Submitting...' : 'Submit'}
          </button>
          
        </form>

        <button onClick={onClose}>Close</button>
        <button onClick={handleDelete} disabled={loadDelete}>
          {loadDelete ? 'Deleting...' : 'Delete'}
        </button>
        {localError && (
          <div>
            {localError}
          </div>
        )}
      </div>
    </dialog>
  )
}

export default WorkoutModal