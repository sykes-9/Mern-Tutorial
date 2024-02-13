import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate() // Initialize navigate function from react-router-dom
  const dispatch = useDispatch() // Initialize dispatch function from react-redux

  // Extract user information from the auth state
  const { user } = useSelector((state) => state.auth)

  // Extract goals, loading status, error status, and error message from the goals state
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    // Check for error and log the error message if exists
    if (isError) {
      console.log(message)
    }

    // Redirect to login page if user or user's token is missing
    if (!user || !user.token) {
      navigate('/login')
      return // Exit early if user or token is missing
    }

    // Dispatch an action to fetch user's goals
    dispatch(getGoals())

    // Clean up function to reset the goals state when the component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  // Render loading spinner if data is loading
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {/* Render goals if exists, otherwise display a message */}
        {goals.length > 0 ? (
          <div className="goals">
            {/* Map through the goals and render each goal item */}
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
