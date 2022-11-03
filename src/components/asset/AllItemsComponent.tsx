/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:46:58
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-03 16:43:34
 * @FilePath: /wave-app-webiste/src/components/asset/AllItemsComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TradeComponent from 'components/trade/TradeComponent'
import { AssetAllItemsComponent, getAssetNameByType } from 'model/asset'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Http from 'services/http'
import { floorNum } from 'utils/functions'
import { getAssetDetailPathByTradeItem } from 'utils/route'

export default function AllItemsComponent(props) {
  const { collectionId } = props
  const [allItems, setAllItems] = useState<Array<AssetAllItemsComponent>>([])

  useEffect(() => {
    Http.getInstance()
      .getNFTList(collectionId, 1)
      .then(response => {
        setAllItems(response.data)
        console.log('response', response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="asset">
      <div className="container mx-auto">
        <ul className="all-item">
          {allItems?.map((item, index) => {
            return (
              <li className="item" key={index}>
                <Link href="">
                  <a href="" className="cover">
                    <div className="perfect-square">
                      <img src={item.image} alt="img" />
                    </div>
                    <div className="collection-name">
                      <h3>{item.name}</h3>
                      <h4>{floorNum(item.highest_bid_price)} NEW</h4>
                      <p className="price">
                        <span>List Price</span>
                        <span>Floor Difference</span>
                      </p>
                      <p className="gains">
                        <span className="left">--</span>
                        <span className="right">--</span>
                      </p>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
