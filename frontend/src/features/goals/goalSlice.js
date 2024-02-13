import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// Define initial state for the goal slice
const initialState = {
    goals: [],          // Array to store user goals
    isError: false,     // Flag indicating if an error occurred
    isSuccess: false,   // Flag indicating if the action was successful
    isLoading: false,   // Flag indicating if the action is currently loading
    message: ''         // Error or success message
}

// Async thunk action to create a new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      // Get token from auth state
      const token = thunkAPI.getState().auth.user.token
      // Call goalService.createGoal to create a new goal
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      // Handle errors and return the rejection value with the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Async thunk action to fetch user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      // Get token from auth state
      const token = thunkAPI.getState().auth.user.token
      // Call goalService.getGoals to fetch user goals
      return await goalService.getGoals(token)
    } catch (error) {
      // Handle errors and return the rejection value with the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Async thunk action to delete a user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      // Get token from auth state
      const token = thunkAPI.getState().auth.user.token
      // Call goalService.deleteGoal to delete the goal
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      // Handle errors and return the rejection value with the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create goalSlice with name 'goal' and initial state
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    // Reset action to reset state to initial values
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for createGoal action
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      // Handle fulfilled state for createGoal action
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      // Handle rejected state for createGoal action
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Handle pending state for getGoals action
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      // Handle fulfilled state for getGoals action
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      // Handle rejected state for getGoals action
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Handle pending state for deleteGoal action
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      // Handle fulfilled state for deleteGoal action
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Remove deleted goal from goals array
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      // Handle rejected state for deleteGoal action
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

// Export reset action and reducer
export const { reset } = goalSlice.actions
export default goalSlice.reducer
