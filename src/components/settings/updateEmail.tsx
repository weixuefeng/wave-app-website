/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-16 18:11:09
 * @FilePath: /wave-app-website/src/components/settings/updateEmail.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { EmailAction, UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

let timeChange

export default function UpdateEmail(props) {
  const { setEmailSettingPage, setIsOpen, ticket } = props

  const currentUser = useAppSelector(selectUser) as UserInfo
  const [email, setEmail] = useState<string>()
  const [updateEmailCode, setUpdateEmailCode] = useState<string>()
  const dispatch = useAppDispatch()

  const [isEmail, setIsEmail] = useState(false)
  const [isUpdateEmailCode, setIsUpdateEmailCode] = useState(false)

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

  function requestEmail() {
    let emailVal = undefined || ''
    let emailCodeVal = updateEmailCode == undefined || ''

    if (emailVal || emailCodeVal) {
      setIsUpdateEmailCode(true)
      setIsEmail(true)
      return
    }
    setIsEmail(false)
    setIsUpdateEmailCode(false)
    Http.getInstance()
      .requestUpdateEmail(ticket, email, updateEmailCode, null)
      .then(response => {
        let info = {
          ...currentUser,
          email: email,
        }
        dispatch(updateUserInfo(info))
        setIsOpen(false)
        setEmailSettingPage(0)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function requestVerifyCode() {
    if (email == undefined || '') {
      setIsEmail(true)
      return
    }
    timeChange = setInterval(() => setTime(t => --t), 1000)
    setBtnDisabled(true)
    setIsEmail(false)
    Http.getInstance()
      .requestVerifyCode(email, EmailAction.RESET_EMAIL)
      .then(response => {
        Log.d(response)
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
            New Email Address
          </label>
          <input placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
          <img src="assets/image/icon_email.png" alt="email" />
          {isEmail ? <p className="tit-email">请输入邮箱</p> : null}
        </div>
        <div className="code-box">
          <label htmlFor="text" className="label">
            Email Verification Code
          </label>
          <input placeholder="Verification Code" onChange={e => setUpdateEmailCode(e.target.value)} />
          <img src="assets/image/icon_code.png" alt="code" />
          <button className="send-code" disabled={btnDisabled} onClick={() => requestVerifyCode()}>
            <span>{btnContent}</span>
          </button>
          {isUpdateEmailCode ? <p className="tit-email">请输入验证码</p> : null}
        </div>
        <button className="next" onClick={() => requestEmail()}>
          <span>Next</span>
        </button>
      </div>
    </div>
  )
}
