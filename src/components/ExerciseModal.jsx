
import { useRef, useState} from "react"
import { uppercaseFirstLetter } from "../util/validations";
import { useDeleteExerciseMutation, usePatchExerciseMutation, usePostExerciseMutation } from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";

function ExerciseModal({dialogRef, onClose, modifier, id, exerciseName, primeMuscle, secondMuscle, ytUrl}) {
  const [ localError, setLocalError ] = useState(null);

  const [ 
    postExercise, { isLoading: loadPost } 
  ] = usePostExerciseMutation();

  const [ 
    patchExercise, { isLoading: loadPatch } 
  ] = usePatchExerciseMutation();

  const [ 
    deleteExercise, { isLoading: loadDelete } 
  ] = useDeleteExerciseMutation();


  const user = useSelector((state) => state.user.user);

  const deleteButton = modifier === 'Edit' ? 
    <button onClick={handleDelete} disabled={loadDelete}>
      {loadDelete ? 'Deleting...' : 'Delete'}
    </button> : null;

  const nameRef = useRef();
  const primaryRef = useRef();
  const secondaryRef = useRef();
  const urlRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    //capturing exercise form info and creating object to send in req.
    const name = uppercaseFirstLetter(nameRef.current.value);
    const primary = uppercaseFirstLetter(primaryRef.current.value);
    const secondary = uppercaseFirstLetter(secondaryRef.current.value);
    const url = urlRef.current.value;

    const exercise = {
      name,
      primaryMuscle: primary,
      secondaryMuscle: secondary,
      url,
      userId: user.id
    };

    //post/patch exercise
    try {
      if (modifier === "New") {
        await postExercise(exercise).unwrap();   
      } else {
        await patchExercise({ ...exercise, exerciseId: id}).unwrap();
      }
      onClose();  
    } catch (err) {
      console.error('Failed to submit:', err)
      setLocalError(err.data?.message || 'An error occurred while submitting');
    }
  }

  async function handleDelete() {
    setLocalError(null);
    try {
      await deleteExercise(id).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to delete:', err);
      setLocalError(err.data?.message || 'An error occurred while deleting');
    }
  };

  return (
    <dialog ref={dialogRef}>
      <div>
        <h2>{modifier} Exercise</h2>
        <form onSubmit={handleSubmit}>
          <label>Exercise Name</label>
          <input ref={nameRef} defaultValue={exerciseName || ''}></input>

          <label>Primary Muscle Group</label>
          <input ref={primaryRef} defaultValue={primeMuscle || ''}></input>

          <label>Secondary Muscle Group</label>
          <input ref={secondaryRef} defaultValue={secondMuscle || ''}></input>

          <label>YouTube Link</label>
          <input ref={urlRef} defaultValue={ytUrl || ''}></input>

          <button type="submit" disabled={loadPost || loadPatch}>
            {loadPost || loadPatch ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <button onClick={onClose}>Close</button>
        {deleteButton}
        {localError && (
          <div>
            {localError}
          </div>
        ) }
      </div>
    </dialog>
  )
}

export default ExerciseModal; 

