/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-16 18:11:23
 * @FilePath: /wave-app-website/src/components/settings/verfiyEmail.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { EmailAction, UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

let timeChange

export default function VerfiyEmail(props) {
  const { setEmailSettingPage, setTicket } = props
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [verfiyEmailCode, setVerfiyEmailCode] = useState<string>()
  const [isVerfiyEmailCode, setIsVerfiyEmailCode] = useState(false)
  const [btnContent, setBtnContent] = useState('Send code')
  const [time, setTime] = useState(60)
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser])

  useEffect(() => {
    clearInterval(timeChange)
    return () => clearInterval(timeChange)
  }, [])

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s后重发`)
    } else {
      clearInterval(timeChange)
      setBtnDisabled(false)
      setTime(60)
      setBtnContent('Send code')
    }
  }, [time])

  function oldGetVerifyCode() {
    timeChange = setInterval(() => setTime(t => --t), 1000)
    setBtnDisabled(true)
    Http.getInstance()
      .requestVerifyCode(currentUser.email, EmailAction.CHECK_EMAIL)
      .then(response => {
        Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function oldRequestEmail() {
    if (verfiyEmailCode == undefined || '') {
      setIsVerfiyEmailCode(true)
      return
    }
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
          <button className="send-code" disabled={btnDisabled} onClick={() => oldGetVerifyCode()}>
            <span>{btnContent}</span>
          </button>
          {isVerfiyEmailCode == true ? <p className="tit">请输入验证码</p> : null}
        </div>
        <button className="next" onClick={() => oldRequestEmail()}>
          <span>Next</span>
        </button>
      </div>
    </div>
  )
}
