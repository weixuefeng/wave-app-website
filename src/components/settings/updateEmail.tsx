/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-08 13:50:00
 * @FilePath: /wave-app-website/src/components/settings/updateEmail.tsx
 */

import { EmailAction, UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function UpdateEmail(props) {
  const { t } = useTranslation()
  const { setEmailSettingPage, setIsOpen, ticket } = props
  const spenCode = t('SEND_CODE')
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [email, setEmail] = useState<string>()
  const [updateEmailCode, setUpdateEmailCode] = useState<string>()
  const dispatch = useAppDispatch()

  const [isEmail, setIsEmail] = useState(false)
  const [isUpdateEmailCode, setIsUpdateEmailCode] = useState(false)

  const [btnContent, setBtnContent] = useState(spenCode)
  const [time, setTime] = useState<number>(60)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [sendCodeloading, setSendCodeLoading] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer>()

  let sendAgain = t('SEND_AGAIN')

  useEffect(() => {
    clearInterval(countdownInterval)
    return () => clearInterval(countdownInterval)
  }, [])

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
    setConfirmLoading(true)
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
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  function requestVerifyCode() {
    if (email == undefined || '') {
      setIsEmail(true)
      return
    }
    setSendCodeLoading(true)
    setIsEmail(false)
    Http.getInstance()
      .requestVerifyCode(email, EmailAction.RESET_EMAIL)
      .then(response => {
        setBtnDisabled(true)
        setBtnContent(`${sendAgain} ${time} s`)
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
        setBtnContent(spenCode)
        setBtnDisabled(false)
        setTime(60)
      } else {
        setBtnContent(`${sendAgain} ${countdownTime} s`)
        setTime(--countdownTime)
      }
    }, 1000)
    setCountdownInterval(timeChange)
  }

  return (
    <div className="dialog-settings-email">
      <h2>
        <>{t('MODIFY_EMAIL')}</>
      </h2>
      <div className={'password-box'}>
        <div className="email">
          <label htmlFor="email" className="label">
            {t('NEW_EMAIL_ADDRESS')}
          </label>
          <input placeholder={t('EMAIL_ADDRESS')} onChange={e => setEmail(e.target.value)} />
          <img src="/assets/image/icon_email.png" alt="email" />
          {isEmail ? <p className="tit-email">{t('PLEASE_EMAIL')}</p> : null}
        </div>
        <div className="code-box">
          <label htmlFor="text" className="label">
            {t('EMAIL_VERIFY_CODE')}
          </label>
          <input placeholder={t('VERIFICATION_CODE')} onChange={e => setUpdateEmailCode(e.target.value)} />
          <img src="/assets/image/icon_code.png" alt="code" />
          <button className="send-code" disabled={btnDisabled || sendCodeloading} onClick={() => requestVerifyCode()}>
            <span>
              {btnContent}
              {!btnDisabled && sendCodeloading && '...'}
            </span>
          </button>
          {isUpdateEmailCode ? <p className="tit-email">{t('PLEASE_CODE')}</p> : null}
        </div>
        <button className="primary black" disabled={confirmLoading} onClick={() => requestEmail()}>
          <span>
            {' '}
            {t('CONFIRM')} {confirmLoading && '...'}
          </span>
        </button>
      </div>
    </div>
  )
}
