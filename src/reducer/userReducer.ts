import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginParams, UserInfo } from 'model/user'
import Http from 'services/http'

interface UserState {
  currentUser: UserInfo | undefined
  status: string
}

const initialState = {
  currentUser: undefined,
  status: 'idle',
} as UserState

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    login: state => {
      state
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.currentUser = action.payload
      })
  },
})

export const fetchUser = createAsyncThunk('user/login', async (params: LoginParams) => {
  const response = await Http.getInstance().login(params.email, params.code)
  return response.result
})

export const selectUser = state => state.user.currentUser

export default userSlice.reducer
