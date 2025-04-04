import { useRef } from "react";

import ExerciseModal from "../components/exerciseModal";


function ExercisesPage() {
  const dialog = useRef();

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
    {/* {exercise cards here} */}
  </>
}

export default ExercisesPage;