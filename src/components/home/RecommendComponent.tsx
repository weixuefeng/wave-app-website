import { useTranslation } from 'react-i18next'

import React, { useEffect, useState } from 'react'
import { getAssetDetailPath } from 'utils/route'
import Link from 'next/link'

export function Recommend(props) {
  const { item } = props
  const { t } = useTranslation()

  return (
    <Link href={getAssetDetailPath(item)}>
      <div className="item">
        <div className="cover">
          <div className="perfect_square">
            <img alt={item.name} src={item.image} />
            {item.type === 0 && <div className="evt-icon">EVT</div>}
            {item.type === 4 && <img alt={item.name} src={item.icon} className="img-icon" />}
          </div>
        </div>

        <div className="info-box">
          {item.type !== 4 ? (
            <div className="title">
              <p className="name">{item.name}</p>
              {item.running_time !== 0 && <p className="time">{item.running_time}</p>}
            </div>
          ) : (
            <div className="title title-collection">{item.name}</div>
          )}
          {(item.lowest_sell_price || item.highest_bid_price) && (
            <div className="price-info">
              {item.lowest_sell_price && (
                <>
                  <div className="price-title">{t('FLOOR_PRICE')}</div>
                  <div className="price-num">{Number(item.lowest_sell_price)} NEW</div>
                </>
              )}
              {!item.lowest_sell_price && item.highest_bid_price && (
                <>
                  <div className="price-title">{t('FLOOR_PRICE')}</div>
                  <div className="price-num">{Number(item.highest_bid_price)} NEW</div>
                </>
              )}
            </div>
          )}
          {item.type === 1 && <img src="/assets/image/play_icon.png" alt="" />}
        </div>
      </div>
    </Link>
  )
}

export default function RecommendComponent(props) {
  const { blindBox } = props

  return (
    <div className="recommend">
      <h1>Recommended Box</h1>

      <div className="list">
        {blindBox.map((item, index) => {
          return <Recommend item={item} key={index} />
        })}
      </div>
    </div>
  )
}
