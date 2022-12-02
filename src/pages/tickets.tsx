/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:27:21
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import TicketsComponent from 'components/tickets/TicketsComponent'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { TicketsData } from 'model/tickets'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'

export default function Tickets() {
  let pageModel = new PageModel('Tickets', 'WAVE', '')
  const { t } = useTranslation()
  const ref = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<TicketsData>(ref, fetchData)

  function fetchData(page) {
    return Http.getInstance().getEvtTickets(page)
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
        <div className="container mx-auto pt-9">
          <div className="bread">
            <Link href="/">{t('HOME')}</Link> /{' '}
            <Link href="/tickets">
              <a className="active">{t('TICKETS')}</a>
            </Link>
          </div>
          <h2 className="title">
            <>{t('TICKETS')}</>
          </h2>
          <div className="tickets-item">
            {data?.map((item, index) => {
              return <TicketsComponent key={index} item={item} openModal={openModal} />
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

  return NormalLayoutComponent(content(), pageModel)
}
