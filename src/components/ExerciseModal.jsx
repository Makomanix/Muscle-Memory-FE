
import { useRef} from "react"
import { uppercaseFirstLetter } from "../util/validations";
import { usePostExerciseMutation, useLazyGetAccessTokenQuery } from "../services/MuscleMemoryApi";
import { useSelector } from "react-redux";

function ExerciseModal({ref, onClose, modifier, exerciseName, primeMuscle, secondMuscle, ytUrl}) {

  const [ postExercise, {isLoading, error, data} ] = usePostExerciseMutation();
  const 
    [ trigger, 
      { data: accessToken, 
        error: tokenError, 
        isLoading: loadingToken
      }
    ] = useLazyGetAccessTokenQuery();
  // const [ getAccessToken, ] = useGetAccessTokenQuery();
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

    const exercise = {
      name: nameRef,
      primaryMuscle: primaryRef,
      secondaryMuscle: secondaryRef,
      url: urlRef,
      userId: user.id
    }
    //posting exercise
    try {
      await postExercise(exercise);
    }
    catch {
      if (error.status === 401) {
        console.error('in', error.status);
        trigger();
      }
      
      onClose();
    }
  
  }
  // console.log('out', error.status);
  //if accessToken expired get a new accessToken
    //  else if (data){

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
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  )
}

export default ExerciseModal; 