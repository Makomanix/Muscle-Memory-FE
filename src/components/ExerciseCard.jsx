import { useRef } from "react";

import ExerciseModal from "../components/exerciseModal";
import { useSelector } from "react-redux";

function ExerciseCard({id, name, primaryMuscle, secondaryMuscle, videoUrl, canSelect}) {

  const dialog = useRef();
  const user = useSelector((state) => state.user.user); 
  

  const shouldRenderModal = user.role === 'admin';

  function handleOpenModal() {
    if (user.role !== 'admin') {
      return
    } else {
      dialog.current.showModal();
    }
  }

  function handleCloseModal() {
    dialog.current.close();
  }

  return ( <>
    { shouldRenderModal &&
      <ExerciseModal dialogRef={dialog} onClose={handleCloseModal} modifier={'Edit'} id={id} exerciseName={name} primeMuscle={primaryMuscle} secondMuscle={secondaryMuscle} ytUrl={videoUrl}/> 
    }
    <li onClick={handleOpenModal}>
      <h3>{name}</h3>
      <p>{primaryMuscle}</p>
      <p>{secondaryMuscle}</p>
      <p>{videoUrl}</p>
    </li>
    {canSelect && 
      <div>
        <button type="button">{}</button>
      </div>}
  </>
  )
}

export default ExerciseCard;