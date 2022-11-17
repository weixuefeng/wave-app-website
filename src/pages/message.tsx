/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:35:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 15:48:26
 * @FilePath: /wave-app-webiste/src/pages/notification.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Nodata from 'components/layout/NoData'
import NormalLayout from 'components/layout/NormalLayout'
import { MessageList } from 'model/message'
import { PageModel } from 'model/navModel'
import { UserInfo } from 'model/user'
import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'
import { formatDate } from 'utils/time'

export default function Message() {
  let pageModel = new PageModel('Notification', 'WAVE', '')

  const currentUser = useAppSelector(selectUser) as UserInfo
  const [messageData, setMessageData] = useState<Array<MessageList>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (currentUser) {
      fetchData()
    }
  }, [currentUser])

  function fetchData() {
    setIsLoading(true)
    Http.getInstance()
      .getMessageList(0, currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setMessageData(response.data)
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
          setMessageData(messageData.concat(response.data))
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

  if (messageData?.length == 0) {
    return NormalLayout(<Nodata />, pageModel)
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
      <div className="message">
        <div className="container">
          <ul className="message-itme">
            {messageData?.map((item, index) => {
              return (
                <li className="item" key={index}>
                  <div className="date">{formatDate(item.receive_at)}</div>
                  <div className="content">
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          {loadMore()}
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
