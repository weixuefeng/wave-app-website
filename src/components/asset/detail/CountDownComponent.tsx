import React, { useEffect, useState } from 'react'

export default function CountDownComponent(props) {
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
      <div>Sale ends at {new Date(endTime * 1000).toString()} in</div>
      <div className="time-info">
        <div className="item">
          <p className="green">{day}</p>
          <p>Days</p>
        </div>
        <div className="item">
          <p className="green">{hour}</p>
          <p>Hours</p>
        </div>
        <div className="item">
          <p className="green">{minute}</p>
          <p>Minutes</p>
        </div>
        <div className="item">
          <p className="green">{second}</p>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  )
}
