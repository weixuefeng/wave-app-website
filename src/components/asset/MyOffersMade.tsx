/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-12 16:10:35
 * @FilePath: /wave-app-webiste/src/components/asset/MyOffersMade.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { AssetMyOfferData } from 'model/asset'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum } from 'utils/functions'
import Log from 'utils/log'
import { formatDateTime } from 'utils/time'

export default function MyOffersMade(props) {
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser) as UserInfo
  let [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error, setCurrentPage, refreshData } = usePagination<AssetMyOfferData>(
    ref,
    fetchData
  )

  function fetchData(page) {
    return Http.getInstance().getOrderOffer(currentUser.id, page, OfferType.MADE)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function requestCancelBid(id: number) {
    Http.getInstance()
      .requestCancelBid(id)
      .then(response => {
        closeModal()
        refreshData()
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function dialogContent(id: number) {
    return (
      <div>
        <h2 className="text-base text-gray333">{t('ARE_YOU_SURE')}？</h2>
        <div className="mt-12 flex items-center justify-between">
          <div className="cursor-pointer rounded-xl border-2 border-gray333 px-11 py-4" onClick={closeModal}>
            {t('CANCEL')}
          </div>
          <div
            className="cursor-pointer rounded-xl bg-gray333 px-11 py-4 text-white"
            onClick={() => requestCancelBid(id)}
          >
            {t('CONFIRM')}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="my-offers">
        {data?.length !== 0 ? (
          <div className="offers-item">
            {data?.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div className="received-img">
                    <div className="img-box">
                      <img src={item.nft.image} alt={item.nft.name} />
                    </div>
                    <div className="name">
                      <h3>{item.nft.name}</h3>
                      <p>{item.collection.name}</p>
                    </div>
                  </div>
                  <ul className="price">
                    <li>
                      <span>{t('FROM')}</span>
                      <span className="right">{item.from.name}</span>
                    </li>
                    <li>
                      <span>{t('PRICE')}</span>
                      <span className="right">{floorNum(item.price)} NEW</span>
                    </li>
                    <li>
                      <span>{t('EXPIRE_DATE')}</span>
                      <span className="right">{formatDateTime(item.expire_time)}</span>
                    </li>
                  </ul>
                  <div className="cancel" onClick={openModal}>
                    <>{t('CANCEL')}</>
                  </div>
                  <DialogComponent isOpen={isOpen} closeModal={closeModal}>
                    {dialogContent(item.id)}
                  </DialogComponent>
                </div>
              )
            })}
          </div>
        ) : null}
        <div ref={ref}>
          <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
        </div>
      </div>
    </>
  )
}
