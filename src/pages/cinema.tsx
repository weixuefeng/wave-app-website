/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:27:05
 * @FilePath: /wave-app-website/src/pages/cinema.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CinemaComponent from 'components/cinema/CinemaComponent'
import DialogComponent from 'components/common/DialogComponent'
import DownAppDialog from 'components/dialog/DownAppDialog'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import usePagination from 'hooks/usePagination'
import { CinemaList } from 'model/cinema'
import { PageModel } from 'model/navModel'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'

export default function Cinema() {
  let pageModel = new PageModel('Cinema', 'WAVE', '')
  const { t } = useTranslation()
  const ref = useRef(null)

  let [isOpen, setIsOpen] = useState(false)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<CinemaList>(ref, fetchData)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function fetchData(page) {
    return Http.getInstance().getMyCinemaList(page)
  }

  function content() {
    return (
      <>
        <div className="cinema-page">
          <div className="container mx-auto px-4 pt-9 xl:px-0">
            <div className="bread">
              <Link href="/">{t('HOME')}</Link> /{' '}
              <Link href="/cinema">
                <a className="active">{t('MY_CINEMA')}</a>
              </Link>
            </div>
            <h2 className="title">
              <>{t('MY_CINEMA')}</>
            </h2>
            <div className="cinema">
              {data?.map((item, index) => {
                return <CinemaComponent key={index} item={item} openModal={openModal} />
              })}
            </div>
            <div ref={ref}>
              <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
            </div>
          </div>
        </div>
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <DownAppDialog />
        </DialogComponent>
      </>
    )
  }

  return NormalLayoutComponent(content(), pageModel)
}
