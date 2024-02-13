import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice';

// GoalItem component responsible for rendering individual goal item
function GoalItem({ goal }) {
  const dispatch = useDispatch(); // Initialize dispatch function from react-redux

  // Render goal item with date, text, and delete button
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div> {/* Display creation date of the goal */}
      <h2>{goal.text}</h2> {/* Display text of the goal */}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close"> {/* Dispatch deleteGoal action with goal id */}
        X {/* Display close button */}
      </button>
    </div>
  )
}

export default GoalItem
