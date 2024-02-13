import axios from 'axios'

// Define API URL for goals
const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
  // Configure headers with Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Send POST request to create a new goal with goalData and config
  const response = await axios.post(API_URL, goalData, config)

  // Return response data
  return response.data
}

// Get user goals
const getGoals = async (token) => {
  // Configure headers with Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Send GET request to fetch user goals with config
  const response = await axios.get(API_URL, config)

  // Return response data
  return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  // Configure headers with Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Send DELETE request to delete a goal with goalId and config
  const response = await axios.delete(API_URL + goalId, config)

  // Return response data
  return response.data
}

// Export all goal service functions
const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService
