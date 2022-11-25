/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-25 19:49:41
 * @FilePath: /wave-app-webiste/src/components/blindbox/SellPriceBtn.tsx
 */

import { t } from 'i18next'
import { CollectionInfo, IsWhiteList, SellStatus, UserInWhiteList, WhiteListSellStatus } from 'model/collection_model'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { calculateCountdown, getUTCDetailTime } from 'utils/functions'
import Log from 'utils/log'

export default function SellPriceBtn(props) {
  const { addToCalendar, payOrder, gotoTrade, gotoAssets, collectionInfo, hasAddCalendar } = props

  const info = collectionInfo as CollectionInfo

  const [remainSecond, setRemainSecond] = useState(0)
  let timer

  useEffect(() => {
    if (collectionInfo) {
      const remainTime =
        parseInt(info.white_list_settings.preemption_start_at?.toString()) - parseInt(info.system_time?.toString())
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

  function textStatus() {
    if (collectionInfo.sell_status == SellStatus.SOLD_OUT) {
      return <div className="price end">{Number(collectionInfo.sell_price)}NEW</div>
    } else {
      // is white list
      if (info.have_white_list == IsWhiteList.YES) {
        const whiteListStatus = checkTime()
        if (whiteListStatus != WhiteListSellStatus.TIME_END && info.current_user_in_white_list == UserInWhiteList.YES) {
          return <div className="price">{Number(info.white_list_settings.preemption_sell_price)}NEW</div>
        } else {
          return <div className="price">{Number(collectionInfo.sell_price)}NEW</div>
        }
      } else {
        return <div className="price">{Number(collectionInfo.sell_price)}NEW</div>
      }
    }
  }

  function buttonStatus() {
    // 1. check is InApp， if not in App，return DownloadComponent
    // 2. check sell status, if sell status is selling, return buyComponent,
    //                       if sell status is sold out, return soldOutCompoent
    // 3. if sell status is not start, check white list status
    // 3.1 if is not white list, check calendar status, return addCalendar or addedCalendar
    // 3.2 is is white list, check current user is white list, if user is not white list,return notWhiteList
    // 3.3 user is white list, check white list button
    if (collectionInfo.sell_status == SellStatus.NOT_START) {
      if (info.have_white_list == IsWhiteList.YES) {
        // is white list sell
        if (info.current_user_in_white_list == UserInWhiteList.YES) {
          return whiteListButton()
        } else {
          // user not in white list
          return notWhiteList()
        }
      } else {
        // not white list
        if (hasAddCalendar) {
          return addedCallendarComponent()
        } else {
          return addCallendarComponent()
        }
      }
    } else if (collectionInfo.sell_status == SellStatus.SELLING) {
      return buyComponent()
    } else if (collectionInfo.sell_status == SellStatus.SOLD_OUT) {
      return soldoutComponent()
    }
  }

  function whiteListButton() {
    const status = checkTime()
    switch (status) {
      case WhiteListSellStatus.NOT_START_OUT_24H:
        return (
          <div className="button" onClick={addToCalendar}>
            <p className="whitelist-label">
              <>{t('Whitelist Purchase')}</>
            </p>
            <p className="whitelist-time">{getUTCDetailTime(info.white_list_settings.preemption_start_at)}</p>
          </div>
        )
      case WhiteListSellStatus.NOT_START_IN_24H:
        return (
          <div className="button" onClick={addToCalendar}>
            <p className="whitelist-label">
              <>{t('Whitelist Purchase')}</>
            </p>
            <p className="whitelist-time">{calculateCountdown(remainSecond)}</p>
          </div>
        )
      case WhiteListSellStatus.TIME_SELLING:
        // check user had buy
        const totalLimit = info.white_list_settings.preemption_total_limit
        const hasSaleWhiteList = info.total_preemption_buy_number
        if (totalLimit > hasSaleWhiteList) {
          // continue buy
          // check user buy
          const userTotal = info.current_user_preemption_buy_number
          const userLimit = info.white_list_settings.preemption_buy_limit
          if (userTotal < userLimit) {
            // can buy
            return (
              <div className="button" onClick={payOrder}>
                <>{t('BUY')}</>
              </div>
            )
          } else {
            // can not buy, go to my asset
            return (
              <div className="button" onClick={gotoAssets}>
                <Link href="/trade">
                  <p>
                    <>{t('GOTOTRADE')}</>
                  </p>
                </Link>
              </div>
            )
          }
        } else {
          // whitelist sell out
          // check user has buy?
          if (info.current_user_preemption_buy_number > 0) {
            // has buy, check asset
            return (
              <div className="button" onClick={gotoAssets}>
                <> {t('CHECKMYASSETS')}</>
              </div>
            )
          } else {
            // no buy, go to trade
            return (
              <div className="button" onClick={gotoTrade}>
                <Link href="/trade">
                  <p>
                    <>{t('GOTOTRADE')}</>
                  </p>
                </Link>
              </div>
            )
          }
        }
      case WhiteListSellStatus.TIME_END:
        return notWhiteList()
    }
  }

  function checkTime() {
    const now = parseInt((Date.now() / 1000).toString())
    const startDelta = info.white_list_settings.preemption_start_at - now
    const endDelta = info.white_list_settings.preemption_end_at - now
    if (startDelta > 0) {
      // white list not start
      if (startDelta - 86400 > 0) {
        // start > 24 h
        return WhiteListSellStatus.NOT_START_OUT_24H
      } else {
        // start < 24 h
        return WhiteListSellStatus.NOT_START_IN_24H
      }
    } else if (endDelta > 0) {
      // on white list selling
      return WhiteListSellStatus.TIME_SELLING
    } else {
      // white list sell end
      return WhiteListSellStatus.TIME_END
    }
  }

  function notWhiteList() {
    if (collectionInfo.sell_status == SellStatus.NOT_START) {
      if (hasAddCalendar) {
        return addedCallendarComponent()
      } else {
        return addCallendarComponent()
      }
    } else if (collectionInfo.sell_status == SellStatus.SELLING) {
      return buyComponent()
    } else if (collectionInfo.sell_status == SellStatus.SOLD_OUT) {
      return soldoutComponent()
    }
  }

  function addedCallendarComponent() {
    return (
      <div className="button button-disable">
        <>{t('ADDEDTOCALENDAR')}</>
      </div>
    )
  }

  function addCallendarComponent() {
    return (
      <div
        className={
          collectionInfo.sell_start_time - collectionInfo.system_time < 600 ? 'button button-disable' : 'button'
        }
        onClick={collectionInfo.sell_start_time - collectionInfo.system_time < 600 ? () => {} : addToCalendar}
      >
        <>{t('ADDTOCALENDAR')}</>
      </div>
    )
  }

  function buyComponent() {
    return (
      <div className="button" onClick={payOrder}>
        <>{t('BUY')}</>
      </div>
    )
  }

  function soldoutComponent() {
    return (
      <div className="button" onClick={props.collectionInfo.is_boughtGo ? gotoAssets : gotoTrade}>
        <>
          {props.collectionInfo.is_boughtGo ? (
            t('CHECKMYASSETS')
          ) : (
            <Link href="/trade">
              <p>
                <>{t('GOTOTRADE')}</>
              </p>
            </Link>
          )}
        </>
      </div>
    )
  }

  return (
    <>
      {textStatus()}
      {buttonStatus()}
    </>
  )
}
