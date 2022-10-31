import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

export default HeadImg

function HeadImg(props) {
  const { t } = useTranslation()

  let { collectionInfo, width, height } = props
  console.log('headImg',collectionInfo)

  const [remainSecond, setRemainSecond] = useState(0)
  let timer

  useEffect(() => {
    if(collectionInfo) {
      const remainTime = parseInt(collectionInfo.sell_start_time) - parseInt(collectionInfo.system_time)
      setRemainSecond(remainTime)
      if (collectionInfo.sell_status == 0 && remainTime <= 86400) {
        if (timer) {
          clearInterval(timer)
        }
        countDown(remainTime)
      }
    }
    return () => {
      clearInterval(timer)
    }
  }, [])

  function countDown(startTime) {
    let countDownTime = startTime
    timer = setInterval(() => {
      if(countDownTime > 1){
        setRemainSecond(-- countDownTime)
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  function calculateCountdown(remain) {
    let hrs = Math.floor(remain / 3600) || 0
    remain = remain % 3600
    let min = Math.floor(remain / 60) || 0,
      sec = remain % 60
    return `${fillZero(hrs)}:${fillZero(min)}:${fillZero(sec)}`
  }

  function statusJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return <div className="status-onimg">{t('UPCOMMING_DROP')}</div>
      } else {
        return <div className="status-onimg">{t('COMING_SOON')}</div>
      }
    } else if (collectionInfo.sell_status == 1) {
      return <div className="status-onimg">{t('LIVE_DROP')}</div>
    } else {
      return <div className="status-onimg disabled">{t('SOLD_OUT')}</div>
    }
  }

  function timeJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return <div className="time-onimg">{t('STARTSAT') + ' ' + getTimeStr(collectionInfo.sell_start_time)}</div>
      } else if (remainSecond > 0) {
        return <div className="time-onimg">{t('STARTSIN') + ' ' + calculateCountdown(remainSecond)}</div>
      } else {
        return <></>
      }
    } else {
      if(collectionInfo.reveals_time > 0) {
        return <div className="time-onimg">{t('REVEALSAT') + ' ' + getTimeStr(collectionInfo.reveals_time)}</div>
      } else {
        return <></>
      }
    }
  }

  function getTimeStr(timestamp) {
    let time = new Date(timestamp * 1000),
      timeZone = (time.getTimezoneOffset() * -1) / 60
    return `${fillZero(time.getMonth() + 1)}.${fillZero(time.getDate())} ${fillZero(time.getHours())}:${fillZero(
      time.getMinutes()
    )}:${fillZero(time.getSeconds())}(UTC${timeZone > 0 ? '+' + timeZone : timeZone})`
  }

  function fillZero(num) {
    return Number(num) > 9 ? num.toString() : '0' + num.toString()
  }

  return (
    <div className="head-img">
      <img src={collectionInfo.image} className={width + ' ' + height} alt="" />
      {timeJudge()}
      {statusJudge()}
    </div>
  )
}
