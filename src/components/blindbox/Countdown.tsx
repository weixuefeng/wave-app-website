/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-21 14:42:10
 * @FilePath: /wave-app-webiste/src/components/blindbox/Countdown.tsx
 */

import React, { useEffect, useState } from 'react'
import { CollectionInfo } from 'model/collection_model'
import { calculateCountdown, getUTCDetailTime } from 'utils/functions'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

export default Countdown

function Countdown(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo
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

  function timeJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return <div className="time">{t('STARTSAT') + ' ' + getUTCDetailTime(collectionInfo.sell_start_time)}</div>
      } else if (remainSecond > 0) {
        return <div className="time">{t('STARTSIN') + ' ' + calculateCountdown(remainSecond)}</div>
      } else {
        return <></>
      }
    } else {
      if (collectionInfo.reveals_time > 0) {
        return <div className="time">{t('REVEALSAT') + ' ' + getUTCDetailTime(collectionInfo.reveals_time)}</div>
      } else {
        return <></>
      }
    }
  }

  function statusJudge() {
    if (collectionInfo.sell_status == 0) {
      if (remainSecond > 86400) {
        return (
          <div className="drop">
            <img src="/assets/image/icon_tips.png" alt="upcoming up" />
            <div className="status-onimg">
              <>{t('UPCOMMINGDROP')}</>
            </div>
          </div>
        )
      } else {
        return (
          <div className="drop">
            <img src="/assets/image/icon_tips.png" alt="upcoming up" />
            <div className="status-onimg">
              <>{t('COMINGSOON')}</>
            </div>
          </div>
        )
      }
    } else if (collectionInfo.sell_status == 1) {
      return (
        <div className="drop">
          <img src="/assets/image/icon_tips.png" alt="upcoming up" />
          <div className="status-onimg">
            <>{t('LIVEDROP')}</>
          </div>
        </div>
      )
    }
    // else {
    //   return (
    //     <>
    //       <div className="status-onimg disabled">
    //         <>{t('SOLDOUT')}</>
    //       </div>
    //       <div className="sold-out">
    //         {/* English */}
    //         {i18n.language == 'en' ? (
    //           <img src="/assets/image/sold_out_en.png" alt="sole out" />
    //         ) : (
    //           <img src="/assets/image/sold_out_zh.png" alt="sole out" />
    //         )}
    //       </div>
    //     </>
    //   )
    // }
  }

  return (
    <div className="count-down">
      {timeJudge()}
      {statusJudge()}
    </div>
  )
}
