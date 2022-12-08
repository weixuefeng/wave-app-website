/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 15:28:55
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-08 13:51:05
 * @FilePath: /wave-app-website/src/components/dialog/LoginDialog.tsx
 */
import { Checkbox } from 'antd'
import { EmailAction } from 'model/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch } from 'store/store'
import Log from 'utils/log'

export default function LoginDialog(props) {
  const { t } = useTranslation()
  const { closeModal } = props
  const spenCode = t('SEND_CODE')
  const [email, setEmail] = useState<string>()
  const [verifyCode, setVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  const [loginLoading, setLoginLoading] = useState(false)
  const [btnContent, setBtnContent] = useState(spenCode)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [time, setTime] = useState<number>(60)
  const [sendCodeloading, setSendCodeLoading] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer>()

  const [isEmail, setIsEmail] = useState(false)
  const [isEmailCode, setEmailCode] = useState(false)
  const [isCheckAll, setisCheckAll] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  let sendAgain = t('SEND_AGAIN')

  useEffect(() => {
    clearInterval(countdownInterval)
    return () => clearInterval(countdownInterval)
  }, [])

  function requestLogin() {
    if (verifyCode !== undefined) {
      setEmailCode(false)
    }

    if (verifyCode == undefined || email == undefined) {
      setIsEmail(true)
      setEmailCode(true)
      return
    }

    if (!checkAll) {
      setisCheckAll(true)
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
        setisCheckAll(false)
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
        setBtnContent(`${sendAgain} ${time} s`)
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

  const onCheckAllChange = e => {
    setCheckAll(e.target.checked)
    setisCheckAll(false)
  }

  return (
    <div className="login">
      <div className="title">
        <h3>
          <>{t('LOGIMN_SIGN_UP')}</>
        </h3>
      </div>
      <div className={'password-box'}>
        <div className="email">
          <input placeholder={t('EMAIL_ADDRESS')} onChange={e => setEmail(e.target.value)} />
          <img src="/assets/image/icon_email.png" alt="email" />
          {isEmail ? <p className="tit-email">{t('PLEASE_EMAIL')}</p> : null}
        </div>

        <div className="code-box">
          <input placeholder={t('EMAIL_VERIFY_CODE')} onChange={e => setVerifyCode(e.target.value)} />
          <img src="/assets/image/icon_code.png" alt="code" />
          <button disabled={btnDisabled || sendCodeloading} onClick={() => requestVerifyCode()} className="send-code">
            <span>
              {btnContent} {!btnDisabled && sendCodeloading && '...'}
            </span>
          </button>
          {isEmailCode ? <p className="tit-email">{t('PLEASE_CODE')}</p> : null}
        </div>
        <button
          onClick={() => requestLogin()}
          disabled={loginLoading}
          className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
        >
          <span>
            {t('LOGIN')} {loginLoading && '...'}
          </span>
        </button>
        <div className="agree-box">
          <Checkbox className="checkbox" onChange={onCheckAllChange} checked={checkAll}></Checkbox>
          {isCheckAll ? <p className="check-all">{t('PLEASE_READ')}</p> : null}
          <p className="agree">
            {t('I_AGREE_TO')} <Link href="/terms">{t('TERM_OF_SERVICES')}</Link> {t('AND')}{' '}
            <Link href="/privacy">{t('PRIVACY_POLICY')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
