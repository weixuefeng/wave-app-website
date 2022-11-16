/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-01 15:43:16
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-16 17:51:10
 * @FilePath: /wave-app-website/src/pages/login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EmailAction } from 'model/user'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'
import { fetchUser, selectUser } from '../reducer/userReducer'

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [verifyCode, setVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const router = useRouter()

  function requestVerifyCode() {
    Http.getInstance()
      .requestVerifyCode(email, EmailAction.LOGIN)
      .then(response => {
        Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  if (currentUser) {
    router.push('/')
    return <></>
  } else {
    return (
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
                required
                onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => requestVerifyCode()}
              className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <span>Get Verify Code</span>
            </button>
            <div className="mb-6">
              <label htmlFor="text" className="block text-sm font-semibold leading-6 text-gray-900">
                Verify Code
              </label>
              <input
                type="text"
                id="text"
                className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm"
                required
                onChange={e => setVerifyCode(e.target.value)}
              />
            </div>

            <button
              onClick={() => dispatch(fetchUser({ email: email, code: verifyCode }))}
              className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <span>Sign in to account</span>
            </button>
          </div>
        </div>
      </main>
    )
  }
}
