import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import { getAssetDetailPathByTradeItem } from 'utils/route'
import { getAssetNameByType } from '../model/asset'
import TradeComponent from '../components/trade/TradeComponent'

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
  }, [])

  function content() {
    return (
      <div className="asset">
        <div className="container mx-auto">
          <h2>Trade</h2>
          <ul>
            {tradeItems?.map((item, index) => {
              return <TradeComponent key={index} itemDate={item} />
            })}
          </ul>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
