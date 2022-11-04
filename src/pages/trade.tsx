import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import TradeComponent from '../components/trade/TradeComponent'
import Loading from '../components/loading/loading'

export default function TradePage() {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const [tradeItems, setTradeItems] = useState<Array<TradeItem>>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Http.getInstance()
      .getNFTTradeList(1, null)
      .then(response => {
        setIsLoading(false)
        setTradeItems(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!tradeItems) {
    return <div className="empty">Empty Data</div>
  }

  function content() {
    return (
      <div className="asset trade">
        <div className="container mx-auto">
          <h2>Trade</h2>
          <ul className='trade-item'>
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
