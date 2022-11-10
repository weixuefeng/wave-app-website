/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:43:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 20:12:26
 * @FilePath: /wave-app-webiste/src/components/asset/MyListings.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AssetsOrderOnSaleData, getAssetNameByType } from 'model/asset'
import { UserInfo } from 'model/user'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum, isInViewPort } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export default function Mylistings(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myOrderOnSaleData, setMyOrderOnSaleData] = useState<Array<AssetsOrderOnSaleData>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (currentUser) {
      getOrderOnSale()
    }
  }, [currentUser])

  function getOrderOnSale() {
    setIsLoading(true)
    Http.getInstance()
      .getOrderOnSale(currentUser.id, currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setMyOrderOnSaleData(response.data)
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
          setMyOrderOnSaleData(myOrderOnSaleData.concat(response.data))
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
          getOrderOnSale()
        }
      }
    }
  }

  return (
    <>
      <div className="my-listings">
        {myOrderOnSaleData?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <Link href={''}>
                <a href="" className="cover">
                  <div className="perfect-square">
                    <img src={item.nft.image} alt={item.nft.name} />
                    <span className={getAssetNameByType(item.nft.type) == 'nft' ? 'type' : ''}>
                      {getAssetNameByType(item.nft.type)}
                    </span>
                  </div>
                  <div className="name">
                    <h3>{item.nft.name}</h3>
                    <p className="list-price">
                      <span>List Price</span>
                      <span>Floor Difference</span>
                    </p>
                    <p className="price">
                      <span>{floorNum(item.price)} NEW</span>
                      <span>{formatDateTime(item.expire_time)}</span>
                    </p>
                    <div className="cancel">Cancel</div>
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <button ref={ref} className="primary black mb-10" onClick={() => getOrderOnSale()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </>
  )
}
