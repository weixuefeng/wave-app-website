/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-17 20:01:57
 * @FilePath: /wave-app-website/src/pages/trade.tsx
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import Nodata from 'components/layout/noData'
import NormalLayout from 'components/layout/normalLayout'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useRef } from 'react'
import Http from 'services/http'
import TradeComponent from '../components/trade/TradeComponent'

export default function TradePage(props) {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<TradeItem>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getNFTTradeList(currentPage, null)
  }

  function content() {
    return (
      <div className="asset trade">
        <div className="container mx-auto">
          <h2>Trade</h2>
          <ul>
            {data?.map((item, index) => {
              return <TradeComponent key={index} itemDate={item} />
            })}
          </ul>
          <div ref={ref}>
            <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data}/>
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
