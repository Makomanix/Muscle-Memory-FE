import { useState } from "react"

function ExerciseButton({exercise, handleClick, modifier}) {

  console.log('INSIDE X-BUTTON');
  console.log(exercise);

  return <>
    <li>
      <button type='button' onClick={() => handleClick(exercise)}>
        {exercise.name}
      </button>
    </li>
  </>
};

export default ExerciseButton;