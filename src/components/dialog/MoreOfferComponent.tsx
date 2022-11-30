/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 22:35:08
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 15:58:36
 * @FilePath: /wave-app-webiste/src/components/dialog/MoreOfferComponent.tsx
 */
import LoadingCompontent from 'components/layout/LoadingCompontent'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { AssetMyOfferData } from 'model/asset'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import { floorNum } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export function OfferReceivedItem(props) {
  const { t } = useTranslation()
  const { id,fromName, price, time, requestAcceptBid } = props
  return (
    <div className="from-box">
      <div className="from">
        <span>{t('FROM')}</span>
        <span className="right">{fromName}</span>
      </div>
      <div className="price">
        <span>{t('PRICE')}</span>
        <span className="right">{floorNum(price)} NEW</span>
      </div>
      <div className="expire">
        <span>{t('EXPIRE_DATE')}</span>
        <span className="right">{formatDateTime(time)}</span>
      </div>
      <div
        className="accept"
        onClick={() => {
          requestAcceptBid(id)
        }}
      >
        {t('ACCEPT')}
      </div>
    </div>
  )
}

export default function MoreOfferComponent(props) {
  const { t } = useTranslation()
  const { nftId, requestAcceptBid } = props
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<AssetMyOfferData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().requestNFTOrderOffers(nftId, currentPage)
  }

  if (!data) {
    return <LoadingCompontent />
  }

  return (
    <div className="dialog-offers-received">
      <h2>{data[0].nft.name}</h2>
      <h3>{t('MORE_OFFERS')}</h3>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <OfferReceivedItem
              id={item.id}
              nftName={item.nft.name}
              fromName={item.from.name}
              price={item.price}
              time={item.expire_time}
              requestAcceptBid={requestAcceptBid}
            />
          </div>
        )
      })}
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
