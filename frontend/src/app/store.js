import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Importing the auth reducer slice
import goalReducer from '../features/goals/goalSlice'; // Importing the goals reducer slice

// Creating the Redux store with combined reducers
export const store = configureStore({
  reducer: {
    auth: authReducer, // Assigning the auth reducer to the 'auth' slice of the store
    goals: goalReducer, // Assigning the goals reducer to the 'goals' slice of the store
  },
});
