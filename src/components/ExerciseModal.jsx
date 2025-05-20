
import { useRef} from "react"
import { uppercaseFirstLetter } from "../util/validations";
import { usePostExerciseMutation } from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";

function ExerciseModal({ref, onClose, modifier, id, exerciseName, primeMuscle, secondMuscle, ytUrl}) {

  const [ postExercise, {isLoading, error, data} ] = usePostExerciseMutation();

  const user = useSelector((state) => state.user.user);

  let nameRef = useRef(exerciseName || null);
  let primaryRef = useRef(primeMuscle || null);
  let secondaryRef = useRef(secondMuscle || null);
  let urlRef = useRef(ytUrl || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //capturing exercise form info and creating object to send in req.
    nameRef = uppercaseFirstLetter(nameRef.current.value);
    primaryRef = uppercaseFirstLetter(primaryRef.current.value);
    secondaryRef = uppercaseFirstLetter(secondaryRef.current.value);
    urlRef = uppercaseFirstLetter(urlRef.current.value);

    let exercise;
    //post/patch exercise
    if (modifier === "New") {
      exercise = {
        name: nameRef,
        primaryMuscle: primaryRef,
        secondaryMuscle: secondaryRef,
        url: urlRef,
        userId: user.id
      }
      await postExercise(exercise);     
    } else {
      exercise = {
        _id: id,
        name: nameRef,
        primaryMuscle: primaryRef,
        secondaryMuscle: secondaryRef,
        url: urlRef,
        userId: user.id
      }
      // await patchExercise(exercise);
    }
    onClose();  
  }

  return (
    <dialog ref={ref}>
      <div>
        <h2>{modifier} Exercise</h2>
        <form onSubmit={handleSubmit}>
          <label>Exercise Name</label>
          <input ref={nameRef} value={exerciseName || ''}></input>
          <label>Primary Muscle Group</label>
          <input ref={primaryRef} value={primeMuscle || ''}></input>
          <label>Secondary Muscle Group</label>
          <input ref={secondaryRef} value={secondMuscle || ''}></input>
          <label>YouTube Link</label>
          <input ref={urlRef} value={ytUrl || ''}></input>
          <button>Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  )
}

export default ExerciseModal; 