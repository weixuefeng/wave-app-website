/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 17:33:04
 * @FilePath: /wave-app-webiste/src/components/trade/TradeComponent.tsx
 */
import { t } from 'i18next'
import Link from 'next/link'
import React from 'react'
import { floorNum } from 'utils/functions'
import { getAssetDetailPathByTradeItem } from 'utils/route'
import { getTradeNameByType } from '../../model/asset'

export default function TradeComponent(props) {
  const { item } = props

  return (
    <li className="item">
      <Link href={getAssetDetailPathByTradeItem(item)}>
        <a href="" className="cover">
          <div className="perfect-square">
            <img src={item.image} alt={item.name} />
            <span className={getTradeNameByType(item.type) == 'NFT' ? 'type' : ''}>
              {getTradeNameByType(item.type)}
            </span>
          </div>
          <div className="collection-name">
            <h3>{item.name}</h3>
            <h4>{floorNum(item.price) == 0 ? '--' : floorNum(item.price)} NEW</h4>
            <p className="price">
              <span>
                <>{t('LIST_PRICE')}</>
              </span>
              <span>
                <>{t('FLOOR_DIFFERENCE')}</>
              </span>
            </p>
            <p className="gains">
              {item.list_price_direction == 1 ? (
                <span className="left">
                  + {floorNum(item.list_price_percent)} % ↑<i></i>
                </span>
              ) : item.list_price_direction == 0 ? (
                <span className="left reduction">
                  - {floorNum(item.list_price_percent)} % ↓<i></i>
                </span>
              ) : null}
              <span className="right">{floorNum(item.list_price_percent)} above</span>
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}
