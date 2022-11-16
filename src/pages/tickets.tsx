/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 12:03:28
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { TicketsData } from 'model/tickets'
import React, { useState, useEffect } from 'react'
import Http from 'services/http'
import { formatDateTime } from 'utils/time'

export default function Tickets() {
  let pageModel = new PageModel('Tickets', 'WAVE', '')
  const [ticketData, setTicketData] = useState<Array<TicketsData>>()

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

  function fetchData() {
    Http.getInstance()
      .getEvtTickets(1)
      .then(response => {
        setTicketData(response.data)
      })
      .catch(error => {
        console.log(error)
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
        </div>
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <DownAppDialog />
        </DialogComponent>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
