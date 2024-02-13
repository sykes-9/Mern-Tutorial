import axios from 'axios'

const API_URL = '/api/users/' // Define base API URL for user-related endpoints

// Function to register a new user
const register = async (userData) => {
  // Send a POST request to the API to register the user
  const response = await axios.post(API_URL, userData)

  // If registration is successful, store user data in local storage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // Return the response data
  return response.data
}

// Function to log in an existing user
const login = async (userData) => {
  // Send a POST request to the API to log in the user
  const response = await axios.post(API_URL + 'login', userData)

  // If login is successful, store user data in local storage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  // Return the response data
  return response.data
}

// Function to log out the current user
const logout = () => {
  // Remove user data from local storage
  localStorage.removeItem('user')
}

// Export the authService object with register, login, and logout functions
const authService = {
  register,
  logout,
  login,
}

export default authService
