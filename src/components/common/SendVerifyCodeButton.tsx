/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 17:23:27
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 21:46:06
 * @FilePath: /wave-app-webiste/src/components/common/SendVerifyCodeButton.tsx
 */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'

export default function SendVerifyCodeButton(props) {
  const { t } = useTranslation()
  const { email, action } = props

  const spenCode = t('SEND_CODE')

  const [btnContent, setBtnContent] = useState(spenCode)
  const [time, setTime] = useState<number>(60)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [sendCodeloading, setSendCodeLoading] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer>()

  useEffect(() => {
    clearInterval(countdownInterval)
    return () => clearInterval(countdownInterval)
  }, [])

  function sendCodeCountDown(startTime) {
    let countdownTime = --startTime
    let timeChange = setInterval(() => {
      if (countdownTime < 0) {
        clearInterval(timeChange)
        setBtnContent(spenCode)
        setBtnDisabled(false)
        setTime(60)
      } else {
        setBtnContent(`${countdownTime} s`)
        setTime(--countdownTime)
      }
    }, 1000)
    setCountdownInterval(timeChange)
  }

  function sendEmailCode() {
    setSendCodeLoading(true)
    Http.getInstance()
      .requestVerifyCode(email, action)
      .then(response => {
        setBtnDisabled(true)
        setBtnContent(`${time} s`)
        sendCodeCountDown(time)
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setSendCodeLoading(false)
      })
  }

  return (
    <div>
      <img src="assets/image/icon_code.png" alt="code" />
      <button className="send-code" disabled={btnDisabled || sendCodeloading} onClick={() => sendEmailCode()}>
        <span>
          {btnContent} {!btnDisabled && sendCodeloading && '...'}
        </span>
      </button>
    </div>
  )
}
