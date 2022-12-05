/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-05 14:48:38
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

  function priceDirection(direction, percent) {
    if (direction == 0) {
      return (
        <span className="left direction">
          {floorNum(percent)} % <i></i>
        </span>
      )
    } else if (direction == 1) {
      return (
        <span className="left">
          + {floorNum(percent)} % ↑<i></i>
        </span>
      )
    } else {
      return (
        <span className="left reduction">
          - {floorNum(percent)} % ↓<i></i>
        </span>
      )
    }
  }

  if (!item) {
    return <></>
  }

  function titleIndex(name) {
    if (name.lastIndexOf('#') !== -1) {
      return (
        <h3>
          {name.substring(0, item.name.indexOf('#'))}
          <br className="black md:hidden" /># {name.lastIndexOf('#')}
        </h3>
      )
    } else {
      return <h3>{name}</h3>
    }
  }

  return (
    <li className="item">
      <Link href={getAssetDetailPathByTradeItem(item) !== null ? getAssetDetailPathByTradeItem(item) : '/'}>
        <a className="cover">
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
              {priceDirection(item.list_price_direction, item.list_price_percent)}
              <span className="right">
                <>
                  {floorNum(item.list_price_percent)} %{floorNum(item.list_price_percent) !== 0 ? t('ABOVE') : null}
                </>
              </span>
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}
