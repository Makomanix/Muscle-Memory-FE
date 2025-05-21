import { useRef } from "react";

import ExerciseModal from "../components/exerciseModal";

function ExerciseCard({id, name, primaryMuscle, secondaryMuscle, videoUrl}) {

  const dialog = useRef();

  function handleOpenModal() {
    dialog.current.showModal();
  }

  function handleCloseModal() {
    dialog.current.close();
  }
  return ( <>
    <ExerciseModal dialogRef={dialog} onClose={handleCloseModal} modifier={'Edit'} id={id} exerciseName={name} primeMuscle={primaryMuscle} secondMuscle={secondaryMuscle} ytUrl={videoUrl}/> 
    <li onClick={handleOpenModal}>
      <h3>{name}</h3>
      <p>{primaryMuscle}</p>
      <p>{secondaryMuscle}</p>
      <p>{videoUrl}</p>
    </li>
  </>
  )
}

export default ExerciseCard;