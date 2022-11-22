import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'

export default function SendVerifyCodeButton(props) {
  const { email, action } = props

  const [btnContent, setBtnContent] = useState('Send code')
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

  function sendEmailCode() {
    setSendCodeLoading(true)
    Http.getInstance()
      .requestVerifyCode(email, action)
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
