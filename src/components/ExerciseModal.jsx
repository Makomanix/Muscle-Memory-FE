export default function ExerciseModal({modifier, name, primaryMuscle, secondaryMuscle, url}) {

  return (
    <dialog>
      <div>
        <h2>{modifier} Exercise</h2>
        <form>
          <label>Exercise Name</label>
          <input placeholder={`${name}` || ''}></input>
          <label>Primary Muscle Group</label>
          <input placeholder={`${primaryMuscle}` || ''}></input>
          <label>Secondary Muscle Group</label>
          <input placeholder={`${secondaryMuscle}` || ''}></input>
          <label>YouTube Link</label>
          <input placeholder={`${url}` || ''}></input>
        </form>
      </div>
    </dialog>
  )
}