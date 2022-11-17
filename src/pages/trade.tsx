/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 15:39:40
 * @FilePath: /wave-app-webiste/src/pages/trade.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import LoadMore from 'components/layout/loadMore'
import Nodata from 'components/layout/noData'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useRef, useState } from 'react'
import Http from 'services/http'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'
import TradeComponent from '../components/trade/TradeComponent'

export default function TradePage(props) {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const [tradeItems, setTradeItems] = useState<Array<TradeItem>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setIsLoading(true)
    Http.getInstance()
      .getNFTTradeList(currentPage, null)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setTradeItems(response.data)
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            // update current page
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        } else {
          // more page
          setTradeItems(tradeItems.concat(response.data))
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  if (tradeItems?.length == 0) {
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

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          fetchData()
        }
      }
    }
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
            {tradeItems?.map((item, index) => {
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
