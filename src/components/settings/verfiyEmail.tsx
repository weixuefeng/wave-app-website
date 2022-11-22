/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-22 17:15:48
 * @FilePath: /wave-app-website/src/components/settings/verfiyEmail.tsx
 */

import SendVerifyCodeButton from 'components/common/SendVerifyCodeButton'
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
  const [nextLoading, setNextLoading] = useState(false)

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
          <SendVerifyCodeButton
            email={currentUser?.email}
            action={EmailAction.CHECK_EMAIL}
            />
          {isVerfiyEmailCode == true ? <p className="tit">请输入验证码</p> : null}
        </div>
        <button className="primary black" disabled={nextLoading} onClick={() => oldRequestEmail()}>
          <span>Next {nextLoading && '...'}</span>
        </button>
      </div>
    </div>
  )
}
