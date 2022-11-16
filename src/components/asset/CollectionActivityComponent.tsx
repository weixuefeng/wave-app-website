/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 16:47:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-15 20:08:17
 * @FilePath: /wave-app-webiste/src/components/asset/CollectionActivityComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CollectionActivitiesItem } from 'model/asset'
import React, { useEffect, useRef, useState } from 'react'
import Http from 'services/http'
import { floorNum, isInViewPort, trimStr } from 'utils/functions'
import Log from 'utils/log'
import { formatDate } from 'utils/time'

export default function CollectionActivity(props) {
  const { collectionId } = props
  const [activity, setActivity] = useState<Array<CollectionActivitiesItem>>([])
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
      .getNFTActivity(collectionId, currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setActivity(response.data)
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
          setActivity(activity.concat(response.data))
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
    <>
      <div className="collection-activity">
        {activity?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="event">{item.event}</div>
              <div className="info">
                <div>
                  <img src={item.from_user.avatar} alt={item.nft.name} />
                </div>
                <h3>{item.nft.name}</h3>
              </div>
              <div className="price">{floorNum(item.price)} NEW</div>
              <div className="trading">
                <div className="form">
                  <img src={item.from_user.avatar} alt="avatar" />
                </div>
                <h4>{trimStr(item.from_user.name)}</h4>
                <div className="arrow">
                  <img src="/assets/image/icon_arrow.png" alt="arrow-img" />
                </div>
                <div className="to">
                  <img src={item.to_user.avatar} alt="avatar" />
                </div>
                <h4>{item.to_user.name}</h4>
              </div>
              <div className="date">{formatDate(item.activity_time)}</div>
            </div>
          )
        })}
      </div>
      <button ref={ref} className="primary black" onClick={() => fetchData()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </>
  )
}
