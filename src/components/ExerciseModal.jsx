
import { useRef} from "react"
import { uppercaseFirstLetter } from "../util/validations";
import { usePostExerciseMutation } from "../services/MuscleMemoryApi";

function ExerciseModal({ref, modifier, exerciseName, primeMuscle, secondMuscle, ytUrl}) {

  const [ postExercise, {isLoading, error} ] = usePostExerciseMutation();

  let nameRef = useRef(exerciseName || null);
  let primaryRef = useRef(primeMuscle || null);
  let secondaryRef = useRef(secondMuscle || null);
  let urlRef = useRef(ytUrl || null);

  async function handleSubmit(e) {
    e.preventDefault();
    nameRef = uppercaseFirstLetter(nameRef.current.value);
    primaryRef = uppercaseFirstLetter(primaryRef.current.value);
    secondaryRef = uppercaseFirstLetter(secondaryRef.current.value);
    urlRef = uppercaseFirstLetter(urlRef.current.value);
    const exercise = {
      name: nameRef,
      primaryMuscle: primaryRef,
      secondMuscle: secondaryRef,
      url: urlRef
    }
    await postExercise(exercise)
  }

  return (
    <dialog ref={ref}>
      <div>
        <h2>{modifier} Exercise</h2>
        <form onSubmit={handleSubmit}>
          <label>Exercise Name</label>
          <input ref={nameRef} placeholder={exerciseName || ''}></input>
          <label>Primary Muscle Group</label>
          <input ref={primaryRef} placeholder={primeMuscle || ''}></input>
          <label>Secondary Muscle Group</label>
          <input ref={secondaryRef} placeholder={secondMuscle || ''}></input>
          <label>YouTube Link</label>
          <input ref={urlRef} placeholder={ytUrl || ''}></input>
          <button>Submit</button>
        </form>
      </div>
    </dialog>
  )
}

export default ExerciseModal; 