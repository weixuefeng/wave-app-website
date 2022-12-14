/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-09-29 15:46:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 16:06:00
 * @FilePath: /wave-app-webiste/src/components/collection/headImg.tsx
 */
import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import { calculateCountdown, fillZero, getUTCDetailTime } from 'utils/functions'
import { useTranslation } from 'react-i18next'

export default HeadImg

function HeadImg(props) {
  let { collectionInfo } = props
  const { i18n } = useTranslation()

  const [remainSecond, setRemainSecond] = useState(0)
  let timer

  useEffect(() => {
    if (collectionInfo) {
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
      if (countDownTime > 1) {
        setRemainSecond(--countDownTime)
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  function statusJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return (
          <div className="status-onimg">
            <>{t('UPCOMMINGDROP')}</>
          </div>
        )
      } else {
        return (
          <div className="status-onimg">
            <>{t('COMINGSOON')}</>
          </div>
        )
      }
    } else if (collectionInfo.sell_status == 1) {
      return (
        <div className="status-onimg">
          <>{t('LIVEDROP')}</>
        </div>
      )
    } else {
      return (
        <>
          <div className="status-onimg disabled">
            <>{t('SOLDOUT')}</>
          </div>
          <div className="sold-out">
            {/* English */}
            {i18n.language == 'en' ? (
              <img src="/assets/image/sold_out_en.png" alt="sole out" />
            ) : (
              <img src="/assets/image/sold_out_zh.png" alt="sole out" />
            )}
          </div>
        </>
      )
    }
  }

  function timeJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return (
          <div className="time-onimg">{t('STARTSAT') + ' ' + getUTCDetailTime(collectionInfo.sell_start_time)}</div>
        )
      } else if (remainSecond > 0) {
        return <div className="time-onimg">{t('STARTSIN') + ' ' + calculateCountdown(remainSecond)}</div>
      } else {
        return <></>
      }
    } else {
      if (collectionInfo.reveals_time > 0) {
        return <div className="time-onimg">{t('REVEALSAT') + ' ' + getUTCDetailTime(collectionInfo.reveals_time)}</div>
      } else {
        return <></>
      }
    }
  }

  return (
    <div className="head-img">
      <div className="head-img-top">
        <img className="rounded-xl" src={collectionInfo.image} alt="" />
      </div>
      {timeJudge()}
      {statusJudge()}
    </div>
  )
}
