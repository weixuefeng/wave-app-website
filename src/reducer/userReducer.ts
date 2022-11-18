/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-01 15:43:16
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-18 15:00:39
 * @FilePath: /wave-app-website/src/reducer/userReducer.ts
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalKey } from 'constants/key'
import { putLocalData } from 'localstorage/localstorage'
import { LoginParams, UserInfo } from 'model/user'
import { WalletInfo } from 'model/wallet'
import Http from 'services/http'

interface UserState {
  currentUser: UserInfo | undefined
  currentWallet: WalletInfo | undefined
  status: string
}

const initialState = {
  currentUser: undefined,
  currentWallet: undefined,
  status: 'idle',
} as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserInfo>) => {
      putLocalData(LocalKey.USER, JSON.stringify(action.payload))
      state.currentUser = action.payload
    },
    updateWalletInfo: (state, action: PayloadAction<WalletInfo>) => {
      state.currentWallet = action.payload
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
export const selectWallet = state => state.user.currentWallet

export const { updateUserInfo, updateWalletInfo } = userSlice.actions

export default userSlice.reducer
