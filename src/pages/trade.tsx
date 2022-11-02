import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'

export default function TradePage() {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const [tradeItems, setTradeItems] = useState<Array<TradeItem>>()

  useEffect(() => {
    Http.getInstance()
      .getNFTTradeList(1, null)
      .then(response => {
        setTradeItems(response.result.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  function content() {
    return (
      <div id="asset" className="container mx-auto">
        Trade
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
