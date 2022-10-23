import { createSlice } from '@reduxjs/toolkit'
import { UserInfo } from 'model/user'

interface UserState {
  currentUser: UserInfo | undefined
}

const initialState = {
  currentUser: undefined,
} as UserState

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    login: state => {},
  },
})

export default userSlice.reducer
