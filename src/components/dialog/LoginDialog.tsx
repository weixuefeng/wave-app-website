import { Checkbox } from 'antd'
import { LocalKey } from 'constants/key'
import { putLocalData } from 'localstorage/localstorage'
import { EmailAction } from 'model/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function LoginDialog(props) {
  const { closeModal } = props

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

  function requestLogin() {
    Http.getInstance()
      .login(email, verifyCode)
      .then(response => {
        dispatch(updateUserInfo(response))
        closeModal()
      })
      .catch(error => {
        Log.e(error)
      })
  }

  return (
    <div className="login">
      <div className="title">
        <h3> Log In / Sign Up</h3>
      </div>
      <div className={'password-box'}>
        <div className="email">
          <input placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
          <img src="assets/image/icon_email.png" alt="email" />
        </div>

        <div className="code-box">
          <input placeholder="Verification Code" onChange={e => setVerifyCode(e.target.value)} />
          <img src="assets/image/icon_code.png" alt="code" />
          <button onClick={() => requestVerifyCode()} className="send-code">
            <span>Send code</span>
          </button>
        </div>

        <button
          onClick={() => requestLogin()}
          className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <span>Log in</span>
        </button>

        <div className="agree-box">
          <Checkbox className="checkbox"></Checkbox>
          <p className="agree">
            I agree to WAVE&apos;s <Link href="/b">Terms of Service</Link> and <Link href="/a">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
