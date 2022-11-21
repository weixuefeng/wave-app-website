/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 15:28:55
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-21 19:46:55
 * @FilePath: /wave-app-webiste/src/components/dialog/LoginDialog.tsx
 */
import { Checkbox } from 'antd'
import { EmailAction } from 'model/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch } from 'store/store'
import Log from 'utils/log'

export default function LoginDialog(props) {
  const { closeModal } = props

  const [email, setEmail] = useState<string>()
  const [verifyCode, setVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  const [loginLoading, setLoginLoading] = useState(false)
  const [btnContent, setBtnContent] = useState('Send code')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [time, setTime] = useState<number>(60)
  const [sendCodeloading, setSendCodeLoading] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer>()

  const [isEmail, setIsEmail] = useState(false)
  const [isEmailCode, setEmailCode] = useState(false)
  useEffect(() => {
    clearInterval(countdownInterval)
    return () => clearInterval(countdownInterval)
  }, [])

  function requestLogin() {
    if (verifyCode == undefined) {
      setEmailCode(true)
      return
    }
    setLoginLoading(true)
    Http.getInstance()
      .login(email, verifyCode)
      .then(response => {
        dispatch(updateUserInfo(response))
        closeModal()
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setLoginLoading(false)
        setEmailCode(false)
      })
  }

  function requestVerifyCode() {
    if (email == undefined) {
      setIsEmail(true)
      return
    }
    setSendCodeLoading(true)
    Http.getInstance()
      .requestVerifyCode(email, EmailAction.LOGIN)
      .then(response => {
        setBtnDisabled(true)
        console.log('time:', time)
        setBtnContent(`${time} s后重发`)
        console.log('time2:', time)
        sendCodeCountDown(time)
        Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setSendCodeLoading(false)
        setIsEmail(false)
      })
  }

  function sendCodeCountDown(startTime) {
    let countdownTime = --startTime
    let timeChange = setInterval(() => {
      if (countdownTime < 0) {
        clearInterval(timeChange)
        setBtnContent('Send code')
        setBtnDisabled(false)
        setTime(60)
      } else {
        setBtnContent(`${countdownTime} s后重发`)
        setTime(--countdownTime)
      }
    }, 1000)
    setCountdownInterval(timeChange)
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
          {isEmail ? <p className="tit-email">请输入邮箱</p> : null}
        </div>

        <div className="code-box">
          <input placeholder="Verification Code" onChange={e => setVerifyCode(e.target.value)} />
          <img src="assets/image/icon_code.png" alt="code" />
          <button disabled={btnDisabled || sendCodeloading} onClick={() => requestVerifyCode()} className="send-code">
            <span>
              {btnContent} {!btnDisabled && sendCodeloading && '...'}
            </span>
          </button>
          {isEmailCode ? <p className="tit-email">请输入验证码</p> : null}
        </div>
        <button
          onClick={() => requestLogin()}
          disabled={loginLoading}
          className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <span>Log in {loginLoading && '...'}</span>
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
