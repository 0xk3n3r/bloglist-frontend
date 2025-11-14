import { createSlice} from '@reduxjs/toolkit'
import usersService from '../services/users'

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
  }
})

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll()
  console.log('Fetched users:', users)
  dispatch(setUser(users))
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer