/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-01 15:43:16
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-03 20:28:26
 * @FilePath: /wave-app-webiste/src/reducer/userReducer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalKey } from 'constants/key'
import { getLocalData } from 'localstorage/localstorage'
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
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.currentUser = action.payload
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
  return response
})

export const selectUser = state => state.user.currentUser

export const { updateUserInfo } = userSlice.actions

export default userSlice.reducer
