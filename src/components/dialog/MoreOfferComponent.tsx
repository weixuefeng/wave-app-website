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
  const { id, nftName, fromName, price, time, requestAcceptBid } = props
  return (
    <div className="dialog-offers-received">
      <h3>{nftName}</h3>
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
    </div>
  )
}

export default function MoreOfferComponent(props) {
  const { nftId, requestAcceptBid } = props
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<AssetMyOfferData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().requestNFTOrderOffers(nftId, currentPage)
  }

  if (!data) {
    return <></>
  }

  return (
    <div>
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
