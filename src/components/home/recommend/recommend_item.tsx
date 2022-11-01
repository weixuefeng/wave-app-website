/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-31 15:04:49
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-01 11:41:30
 * @FilePath: /wave-app-webiste/src/components/home/recommend/recommend_item.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Link from 'next/link'
import React from 'react'

import { useTranslation } from 'react-i18next'
import { getAssetDetailPath } from 'utils/route'

export default RecommendItem

function RecommendItem(props) {
  const { t } = useTranslation()

  let { collectionInfo, width, height } = props

  const path = getAssetDetailPath(collectionInfo)

  return (
    <Link href={path}>
      <div className="recommend-item">
        <div className={width + ' ' + height + ' recommend-img'}>
          <img alt={collectionInfo.name} src={collectionInfo.image} className="head-img" />
          {collectionInfo.type === 0 && <div className="evt-icon">EVT</div>}
          {collectionInfo.type === 4 && (
            <img alt={collectionInfo.name} src={collectionInfo.icon} className="img-icon" />
          )}
        </div>
        <div className="info-box">
          {collectionInfo.type !== 4 ? (
            <div className="title">
              <p className="name">{collectionInfo.name}</p>
              {collectionInfo.running_time !== 0 && <p className="time">{collectionInfo.running_time}</p>}
            </div>
          ) : (
            <div className="title title-collection">{collectionInfo.name}</div>
          )}
          {(collectionInfo.lowest_sell_price || collectionInfo.highest_bid_price) && (
            <div className="price-info">
              {collectionInfo.lowest_sell_price && (
                <>
                  <div className="price-title">{t('FLOOR_PRICE')}</div>
                  <div className="price-num">{Number(collectionInfo.lowest_sell_price)} NEW</div>
                </>
              )}
              {!collectionInfo.lowest_sell_price && collectionInfo.highest_bid_price && (
                <>
                  <div className="price-title">{t('FLOOR_PRICE')}</div>
                  <div className="price-num">{Number(collectionInfo.highest_bid_price)} NEW</div>
                </>
              )}
            </div>
          )}
          {collectionInfo.type === 1 && <img src="/assets/image/play_icon.png" alt="" />}
        </div>
      </div>
    </Link>
  )
}
