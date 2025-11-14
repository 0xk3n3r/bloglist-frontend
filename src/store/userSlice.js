import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/users'

export const initializeUsers = createAsyncThunk(
  'users/initialize',
  async () => {
    const users = await usersService.getAll()
    return users
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
    extraReducers: (builder) => {
    builder.addCase(initializeUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer