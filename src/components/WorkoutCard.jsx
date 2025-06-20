import { useRef } from "react";
import { NavLink } from "react-router-dom";
import WorkoutModal from "./WorkoutModal"

function WorkoutCard({id, title, type, image, exercises}) {

    const dialog = useRef();
  
    function handleOpenModal() {
      dialog.current.showModal();
    }
  
    function handleCloseModal() {
      dialog.current.close();
    }

  return (<>
    <WorkoutModal dialogRef={dialog} onClose={handleCloseModal} modifier={'Edit'} id={id} workoutTitle={title} workoutExercises={exercises} workoutImage={image} workoutType={type}/>
    <li onClick={handleOpenModal}>
      <h3>{title}</h3>
      <p>{type}</p>
      <img src={image}/>
      <p><NavLink to={`Workouts/${id}/sessions`}></NavLink></p>
    </li>
    </>
  )
}

export default WorkoutCard