import { useRef, useState } from "react";

import ExerciseModal from "../components/exerciseModal";


function ExercisesPage() {
  const [ isOpen, setIsOpen ] = useState(false);
  const dialog = useRef();

  function handleOpenModal() {
    dialog.current.showModal();
    setIsOpen(!isOpen);
  }



  return <>
    <ExerciseModal ref={dialog} modifier={'New'}/>
    <h1>Exercises</h1>
    <button onClick={handleOpenModal}>Add Exercise</button>
    {/* {exercise cards here} */}
  </>
}

export default ExercisesPage;