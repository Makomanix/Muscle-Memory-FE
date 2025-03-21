import { useRef, useState } from "react";

import ExerciseModal from "../components/exerciseModal";


function ExercisesPage() {
  const [ isOpen, setIsOpen ] = useState(false);
  const dialog = useRef();

  function handleOpenModal() {
      setIsOpen(!isOpen);
  }



  return <>
  {isOpen && (
    <ExerciseModal ref={dialog} modifier={'New'}/>
  )}
    <h1>Exercises</h1>
    {/* {exercise cards here} */}
    <button onClick={handleOpenModal}>Add Exercise</button>
  </>
}

export default ExercisesPage;