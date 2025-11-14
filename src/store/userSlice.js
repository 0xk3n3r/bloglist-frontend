import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/users'

export const initializeUsers = createAsyncThunk(
  'users/initialize',
  async (_, thunkAPI) => {
    try {
      const users = await usersService.getAll()
      console.log('Fetched users:', users)
      return users
    } catch (error) {
      console.error('Failed to fetch users:', error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer