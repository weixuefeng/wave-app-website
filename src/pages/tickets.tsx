/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 15:57:57
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import Nodata from 'components/layout/NoData'
import NormalLayout from 'components/layout/NormalLayout'
import { PageModel } from 'model/navModel'
import { TicketsData } from 'model/tickets'
import React, { useState, useEffect, useRef } from 'react'
import Http from 'services/http'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'
import { formatDateTime } from 'utils/time'

export default function Tickets() {
  let pageModel = new PageModel('Tickets', 'WAVE', '')
  const [ticketData, setTicketData] = useState<Array<TicketsData>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  function fetchData() {
    setIsLoading(true)
    Http.getInstance()
      .getEvtTickets(currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setTicketData(response.data)
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
          setTicketData(ticketData.concat(response.data))
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

  function typeList(type) {
    if (type == 0) {
      return '/assets/image/tickets_not_checked.png'
    } else if (type == 1) {
      return '/assets/image/tickets_checked.png'
    } else if (type == 2) {
      return '/assets/image/tickets_expired.png'
    }
  }

  if (ticketData?.length == 0) {
    return NormalLayout(
      <div className="tickets">
        <div className="container mx-auto">
          <h2 className="title">Tickets</h2>
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
      <div className="tickets">
        <div className="container mx-auto">
          <h2 className="title">Tickets</h2>
          <div className="tickets-item">
            {ticketData?.map((item, index) => {
              return (
                <div className="item" key={index} onClick={openModal}>
                  <div className="img">
                    <img src="/assets/image/tickets_bg.png" alt="tickets background" />
                  </div>
                  <div className="info">
                    <h2>{item.name}</h2>
                    <div className="content">
                      <div className="content-img">
                        <div className="img-box">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div className="time">
                        <h3>Purchase time</h3>
                        <p>{formatDateTime(item.purchase_time)}</p>
                        <h3 className="time-check">Check in deadline</h3>
                        <p>{formatDateTime(item.copyright_expire_time)}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img src={typeList(item.type)} alt="tickets" />
                  </div>
                </div>
              )
            })}
          </div>
          {loadMore()}
        </div>
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <DownAppDialog />
        </DialogComponent>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
