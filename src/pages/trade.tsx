/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-17 18:12:43
 * @FilePath: /wave-app-website/src/pages/trade.tsx
 */
import LoadMore from 'components/layout/loadMore'
import Nodata from 'components/layout/noData'
import NormalLayout from 'components/layout/normalLayout'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useRef } from 'react'
import Http from 'services/http'
import TradeComponent from '../components/trade/TradeComponent'

export default function TradePage(props) {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<TradeItem>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getNFTTradeList(currentPage, null)
  }

  if (data?.length == 0) {
    return NormalLayout(
      <div className="asset trade">
        <div className="container mx-auto">
          <h2>Trade</h2>
          <Nodata />
        </div>
      </div>,
      pageModel
    )
  }

  function loadMore() {
    if (currentPage == 1) {
      return (
        <>
          {isLoading ? (
            <div ref={ref} className="mt-10 text-center text-base text-gray99">
              <img className="mx-auto mt-10 h-auto w-44" src="/assets/image/loading.gif" alt="loading" />
            </div>
          ) : null}
        </>
      )
    } else {
      return (
        <>
          {
            <div ref={ref} className="mt-10 text-center text-base text-gray99">
              {hasMore ? '加载中...' : '—— 没有更多了 ——'}
            </div>
          }
        </>
      )
    }
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
          {loadMore()}
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
