/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:43:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 13:55:52
 * @FilePath: /wave-app-webiste/src/components/asset/MyListings.tsx
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { t } from 'i18next'
import { AssetsOrderOnSaleData, getTradeNameByType } from 'model/asset'
import { UserInfo } from 'model/user'
import Link from 'next/link'
import React, { useRef } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum } from 'utils/functions'
import { getAssetDetailPathByInfo } from 'utils/route'
import { formatDateTime } from 'utils/time'

export default function Mylistings(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<AssetsOrderOnSaleData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getOrderOnSale(currentUser.id, currentPage)
  }

  return (
    <>
      <div className="my-listings">
        {data?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <Link href={getAssetDetailPathByInfo(item.nft.type, item.nft_id)}>
                <a href="" className="cover">
                  <div className="perfect-square">
                    <img src={item.nft.image} alt={item.nft.name} />
                    <span className={getTradeNameByType(item.nft.type) == 'NFT' ? 'type' : ''}>
                      {getTradeNameByType(item.nft.type)}
                    </span>
                  </div>
                  <div className="name">
                    <h3>{item.nft.name}</h3>
                    <p className="list-price">
                      <span>
                        <>{t('LIST_PRICE')}</>
                      </span>
                      <span>
                        <>{t('FLOOR_DIFFERENCE')}</>
                      </span>
                    </p>
                    <p className="price">
                      <span>{floorNum(item.price)} NEW</span>
                      <span>{formatDateTime(item.expire_time)}</span>
                    </p>
                    <div className="cancel">
                      <>{t('CANCEL')}</>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
    </>
  )
}
