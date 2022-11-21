/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-21 17:21:44
 * @FilePath: /wave-app-webiste/src/components/settings/verfiyEmail.tsx
 */

import { EmailAction, UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function VerfiyEmail(props) {
  
  const { setEmailSettingPage, setTicket } = props
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [verfiyEmailCode, setVerfiyEmailCode] = useState<string>()
  const [isVerfiyEmailCode, setIsVerfiyEmailCode] = useState(false)
  const [btnContent, setBtnContent] = useState('Send code')
  const [time, setTime] = useState<number>(60)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [nextLoading, setNextLoading] = useState(false)
  const [sendCodeloading, setSendCodeLoading] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer>()

  useEffect(() => {
    clearInterval(countdownInterval)
    return () => clearInterval(countdownInterval)
  }, [])

  function oldGetVerifyCode() {
    setSendCodeLoading(true)
    Http.getInstance()
      .requestVerifyCode(currentUser.email, EmailAction.CHECK_EMAIL)
      .then(response => {
        setBtnDisabled(true)
        setBtnContent(`${time} s后重发`)
        sendCodeCountDown(time)
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setSendCodeLoading(false)
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

  function oldRequestEmail() {
    if (verfiyEmailCode == undefined || '') {
      setIsVerfiyEmailCode(true)
      return
    }
    setNextLoading(true)
    setIsVerfiyEmailCode(false)
    Http.getInstance()
      .requestEmailprecheck(verfiyEmailCode)
      .then(response => {
        setTicket(response.email_ticket)
        setEmailSettingPage(1)
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setNextLoading(false)
      })
  }

  return (
    <div className="dialog-settings-email">
      <h2>Modify Email</h2>
      <div className={'password-box'}>
        <div className="email">
          <label htmlFor="email" className="label">
            Original Email Address
          </label>
          <p>{currentUser?.email}</p>
        </div>
        <div className="code-box">
          <label htmlFor="text" className="label">
            Email Verification Code
          </label>
          <input placeholder="Verification Code" onChange={e => setVerfiyEmailCode(e.target.value)} />
          <img src="assets/image/icon_code.png" alt="code" />
          <button className="send-code" disabled={btnDisabled || sendCodeloading} onClick={() => oldGetVerifyCode()}>
            <span>{btnContent} {!btnDisabled && sendCodeloading && "..."}</span>
          </button>
          {isVerfiyEmailCode == true ? <p className="tit">请输入验证码</p> : null}
        </div>
        <button className="primary black" disabled={nextLoading} onClick={() => oldRequestEmail()}>
          <span>Next {nextLoading && '...'}</span>
        </button>
      </div>
    </div>
  )
}
