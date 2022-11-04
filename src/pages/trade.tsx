import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TradeItem } from 'model/trade'
import React, { useEffect, useRef, useState } from 'react'
import Http from 'services/http'
import { isInViewPort } from 'utils/functions'
import TradeComponent from '../components/trade/TradeComponent'

export default function TradePage() {
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
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

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
          <button ref={ref} className="primary black" onClick={() => fetchData()}>
            {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
          </button>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
