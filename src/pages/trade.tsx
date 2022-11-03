import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import { getAssetNameByType } from '../model/asset'

export default function TradePage() {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const [tradeItems, setTradeItems] = useState<Array<TradeItem>>()

  useEffect(() => {
    Http.getInstance()
      .getNFTTradeList(1, null)
      .then(response => {
        setTradeItems(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  console.log('nndnnnd', tradeItems)

  function content() {
    return (
      <div className="asset">
        <div className="container mx-auto">
          <h2>Trade</h2>
          <ul>
            {tradeItems?.map((item, index) => {
              return (
                <li className="item" key={index}>
                  <a href="" className="cover">
                    <div className="perfect-square">
                      <img src={item.image} alt="img" />
                      <span className={getAssetNameByType(item.type) == 'nft' ? 'type' : ''}>
                        {getAssetNameByType(item.type)}
                      </span>
                    </div>
                    <div className="collection-name">
                      <h3>{item.name}</h3>
                      <h4>{Math.floor(parseInt(item.price))}NEW</h4>
                      <p className="price">
                        <span>List Price</span>
                        <span>Floor Difference</span>
                      </p>
                      <p className="gains">
                        {
                          item.list_price_direction == 1 ?
                            (<span className='left'>
                              + {Math.floor(parseInt(item.list_price_percent))} % ↑
                              <i></i>
                            </span>) : item.list_price_direction == 0 ?
                              (<span className='left reduction'>
                                - {Math.floor(parseInt(item.list_price_percent))} % ↓
                                <i></i>
                              </span>) : null
                        }
                        <span className="right">{Math.floor(parseInt(item.list_price_percent))} above</span>
                      </p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
