/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:46:58
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-15 20:08:33
 * @FilePath: /wave-app-website/src/components/asset/AllItemsComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CollectionItem } from 'model/asset'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Http from 'services/http'
import { floorNum, isInViewPort } from 'utils/functions'
import { getAssetDetailPathByInfo } from 'utils/route'

export default function AllItemsComponent(props) {
  const { collectionId, type } = props
  const [allItems, setAllItems] = useState<Array<CollectionItem>>([])
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
      .getNFTList(collectionId, currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setAllItems(response.data)
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
          setAllItems(allItems.concat(response.data))
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
        Log.d (error)
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

  return (
    <div className="asset">
      <div className="container mx-auto">
        <ul className="all-item">
          {allItems?.map((item, index) => {
            return (
              <li className="item" key={index}>
                <Link href={getAssetDetailPathByInfo(type, item.nft_id)}>
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
        <button ref={ref} className="primary black" onClick={() => fetchData()}>
          {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
        </button>
      </div>
    </div>
  )
}
