/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 13:51:38
 * @FilePath: /wave-app-webiste/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CinemaComponent from 'components/cinema/CinemaComponent'
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayout from 'components/layout/NormalLayout'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { TicketsData } from 'model/tickets'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'

export default function Tickets() {
  let pageModel = new PageModel('Tickets', 'WAVE', '')
  const { t } = useTranslation()
  const ref = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<TicketsData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getEvtTickets(currentPage)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function content() {
    return (
      <div className="tickets">
        <div className="container mx-auto">
          <h2 className="title">
            <>{t('TICKETS')}</>
          </h2>
          <div className="tickets-item">
            {data?.map((item, index) => {
              return <CinemaComponent key={index} item={item} openModal={openModal()} />
            })}
          </div>
          <div ref={ref}>
            <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
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
