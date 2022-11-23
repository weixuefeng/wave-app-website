/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 21:49:16
 * @FilePath: /wave-app-webiste/src/components/asset/MyOffersReceived.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import MoreOfferComponent from 'components/dialog/MoreOfferComponent'
import MyoffersAcceDialog from 'components/dialog/MyoffersAcceDialog'
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

export default function MyOffersReceived(props) {
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser) as UserInfo
  const ref = useRef(null)
  const { hasMore, isLoading, currentPage, data, error, refreshData } = usePagination<AssetMyOfferData>(ref, fetchData)

  const [isOpen, setIsOpen] = useState(false)
  const [isAcceptOpen, setIsAcceptOpen] = useState(false)

  function fetchData() {
    return Http.getInstance().getOrderOffer(currentUser.id, currentPage, OfferType.RECEIVED)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeAcceptModal() {
    setIsAcceptOpen(false)
  }

  function requestAcceptBid(bidId: number) {
    Http.getInstance()
      .requestAcceptBid(bidId)
      .then(response => {
        setIsAcceptOpen(true)
        refreshData()
      })
      .catch(error => {
        Log.e(error)
      })
  }

  return (
    <div className="my-offers">
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
              <button
                className="button primary black"
                onClick={() => {
                  requestAcceptBid(item.id)
                }}
              >
                {t('ACCEPT')}
              </button>
              {item.has_more == 1 && (
                <div className="see-more" onClick={openModal}>
                  See more
                </div>
              )}
              {/* see more */}
              {/* <DialogComponent isOpen={isOpen} closeModal={closeModal}>
                <MoreOfferComponent nftId={item.nft_id} requestAcceptBid={id => requestAcceptBid(id)} />
              </DialogComponent> */}

              {/* successful */}
              <DialogComponent isOpen={isAcceptOpen} closeModal={closeAcceptModal}>
                <MyoffersAcceDialog />
              </DialogComponent>
            </div>
          )
        })}
      </div>
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
