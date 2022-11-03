/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-03 16:44:40
 * @FilePath: /wave-app-webiste/src/components/trade/TradeComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { floorNum } from 'utils/functions'
import { getAssetDetailPathByTradeItem } from 'utils/route'
import { getAssetNameByType } from '../../model/asset'

export default function TradeComponent(props) {
  const { itemDate } = props

  return (
    <li className="item">
      <Link href={getAssetDetailPathByTradeItem(itemDate)}>
        <a href="" className="cover">
          <div className="perfect-square">
            <img src={itemDate.image} alt="img" />
            <span className={getAssetNameByType(itemDate.type) == 'nft' ? 'type' : ''}>
              {getAssetNameByType(itemDate.type)}
            </span>
          </div>
          <div className="collection-name">
            <h3>{itemDate.name}</h3>
            <h4>{floorNum(itemDate.price)}NEW</h4>
            <p className="price">
              <span>List Price</span>
              <span>Floor Difference</span>
            </p>
            <p className="gains">
              {itemDate.list_price_direction == 1 ? (
                <span className="left">
                  + {floorNum(itemDate.list_price_percent)} % ↑<i></i>
                </span>
              ) : itemDate.list_price_direction == 0 ? (
                <span className="left reduction">
                  - {floorNum(itemDate.list_price_percent)} % ↓<i></i>
                </span>
              ) : null}
              <span className="right">{floorNum(itemDate.list_price_percent)} above</span>
            </p>
          </div>
        </a>
      </Link>
    </li>
  )
}
