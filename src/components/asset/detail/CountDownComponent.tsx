/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-12-02 17:51:23
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 18:03:27
 * @FilePath: /wave-app-webiste/src/components/asset/detail/CountDownComponent.tsx
 */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CountDownComponent(props) {
  const { t } = useTranslation()
  const { endTime, serverTime } = props
  const deltaTime = endTime - serverTime

  const [timer, setTimer] = useState<any>()

  const [day, setDay] = useState('00')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')

  useEffect(() => {
    if (timer != undefined) {
      clearInterval(timer)
    }
    countDown(deltaTime)
    return clearInterval(timer)
  }, [deltaTime])

  function countDown(startTime) {
    let countDownTime = startTime
    let interval = setInterval(() => {
      if (countDownTime > 1) {
        countDownTime--
        calculateCountdown(countDownTime)
      } else {
        clearInterval(interval)
      }
    }, 1000)
    setTimer(interval)
  }

  function calculateCountdown(deltaTime) {
    if (deltaTime <= 0) {
      zero()
    }
    const deltaDay = parseInt((deltaTime / 86400).toString())
    setDay(deltaDay.toString())

    const deltaHour = parseInt(((deltaTime - deltaDay * 86400) / 3600).toString())
    setHour(deltaHour.toString())

    const deltaMinute = parseInt(((deltaTime - deltaDay * 86400 - deltaHour * 3600) / 60).toString())
    setMinute(deltaMinute.toString())

    const deltaSecond = deltaTime - deltaDay * 86400 - deltaHour * 3600 - deltaMinute * 60
    setSecond(deltaSecond.toString())
  }

  function zero() {
    setDay('00')
    setHour('00')
    setMinute('00')
    setSecond('00')
  }

  if (deltaTime <= 0) {
    return <></>
  }
  return (
    <div className="countdown">
      <div>
        {t('SALE_ENDS_AT')} {new Date(endTime * 1000).toString()} {t('IN')}
      </div>
      <div className="time-info">
        <div className="item">
          <p className="green">{day}</p>
          <p>{t('DAYS')}</p>
        </div>
        <div className="item">
          <p className="green">{hour}</p>
          <p>{t('HOURS')}</p>
        </div>
        <div className="item">
          <p className="green">{minute}</p>
          <p>{t('MINUTES')}</p>
        </div>
        <div className="item">
          <p className="green">{second}</p>
          <p>{t('SECONDS')}</p>
        </div>
      </div>
    </div>
  )
}
