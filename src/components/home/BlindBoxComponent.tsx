import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { getAssetDetailPath } from 'utils/route'
import Link from 'next/link'
import { Asset } from 'model/asset'
import { IssueType } from 'model/collection_model'

export function BlindBox(props) {
  const { item } = props
  const { t } = useTranslation()
  const info = item as Asset
  const [remainSecond, setRemainSecond] = useState(0)
  let timer

  useEffect(() => {
    if (item) {
      const remainTime = parseInt(item.blind_box_sell_start_time) - parseInt(item.server_current_time)
      setRemainSecond(remainTime)
      if (item.blind_box_sell_status == 0 && remainTime <= 86400) {
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
      if (countDownTime > 1) {
        setRemainSecond(--countDownTime)
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
    if (item.blind_box_sell_status == 0) {
      if (remainSecond > 86400) {
        return <div className="status-onimg">{t('UPCOMMING_DROP')}</div>
      } else {
        return <div className="status-onimg">{t('COMING_SOON')}</div>
      }
    } else if (item.blind_box_sell_status == 1) {
      return <div className="status-onimg">{t('LIVE_DROP')}</div>
    } else {
      return <div className="status-onimg disabled">{t('SOLD_OUT')}</div>
    }
  }

  function timeJudge() {
    if (item.blind_box_sell_status == 0) {
      if (remainSecond > 86400) {
        return <div className="time-onimg">{t('STARTSAT') + ' ' + getTimeStr(item.blind_box_sell_start_time)}</div>
      } else if (remainSecond > 0) {
        return <div className="time-onimg">{t('STARTSIN') + ' ' + calculateCountdown(remainSecond)}</div>
      } else {
        return <></>
      }
    } else {
      if (item.blind_box_reveals_time > 0) {
        return <div className="time-onimg">{t('REVEALSAT') + ' ' + getTimeStr(item.blind_box_reveals_time)}</div>
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
    <Link href={getAssetDetailPath(item)}>
      <div className="item">
        <div className="cover">
          <div className="perfect_square">
            <img alt={item.name} src={item.image} />
            {timeJudge()}
            {statusJudge()}
          </div>
        </div>
        <div className="profile">
          <h3>{item.name}</h3>
          <div className="blindbox-footer">
            <div className="num-wrap">
              <div className="num-name">
                {info.issue_type == IssueType.MULTI_ISSUE ? t('CURRENT_RELEASE') : t('TOTAL_RELEASE')}
              </div>
              <div className="num">{item.blind_box_total}</div>
            </div>
            <div className="price">{Number(item.price)} NEW</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function BlindBoxComponent(props) {
  const { blindBox } = props
  const { t } = useTranslation()
  if (!blindBox) {
    return <></>
  }

  if (blindBox?.length == 0) {
    return <div className="blind-box"></div>
  }

  return (
    <div className="blind-box">
      <h1>
        <>{t('HOME_DROPS')}</>
      </h1>
      <div className="list">
        {blindBox.map((item, index) => {
          return <BlindBox item={item} key={index} />
        })}
      </div>
    </div>
  )
}
