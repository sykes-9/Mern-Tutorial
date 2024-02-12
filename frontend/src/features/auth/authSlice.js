import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// Define initial state for the auth slice
const initialState = {
  user: user ? user : null,   // User object fetched from localStorage or null if not found
  isError: false,             // Flag indicating if an error occurred
  isSuccess: false,           // Flag indicating if the action was successful
  isLoading: false,           // Flag indicating if the action is currently loading
  message: '',                // Error or success message
}

// Async thunk action to register a user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      // Call authService.register to register the user
      return await authService.register(user)
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

// Async thunk action to login a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    // Call authService.login to log in the user
    return await authService.login(user)
  } catch (error) {
    // Handle errors and return the rejection value with the error message
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Async thunk action to logout a user
export const logout = createAsyncThunk('auth/logout', async () => {
  // Call authService.logout to log out the user
  await authService.logout()
})

// Create authSlice with name 'auth' and initial state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset action to reset state to initial values
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for register action
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      // Handle fulfilled state for register action
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      // Handle rejected state for register action
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Handle pending state for login action
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      // Handle fulfilled state for login action
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      // Handle rejected state for login action
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Handle fulfilled state for logout action
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

// Export actions and reducer
export const { reset } = authSlice.actions
export default authSlice.reducer
