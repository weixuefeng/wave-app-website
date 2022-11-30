/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:42:02
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 13:54:25
 * @FilePath: /wave-app-webiste/src/components/asset/MyOwn.tsx
 */

import { AssetsMyOwnData, getTradeNameByType } from 'model/asset'
import Link from 'next/link'
import React, { useRef } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { UserInfo } from 'model/user'
import { useAppSelector } from 'store/store'
import { getAssetDetailPathByInfo } from 'utils/route'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { useTranslation } from 'react-i18next'

export default function Myown(props) {
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser) as UserInfo
  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<AssetsMyOwnData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getMyAssetList(currentUser.id, currentPage)
  }

  return (
    <>
      <div className="my-own">
        {data?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <Link href={getAssetDetailPathByInfo(item.type, item.nft_id)}>
                <a className="cover">
                  <div className="perfect-square">
                    <img src={item.image} alt={item.name} />
                    <span className={getTradeNameByType(item.type) == 'NFT' ? 'type' : ''}>
                      {getTradeNameByType(item.type)}
                    </span>
                    {item.status == 1 ? (
                      <p className="on-sale">
                        <>{t('ON_SALE')}</>
                      </p>
                    ) : null}
                  </div>
                  <div className="own-name">{item.name}</div>
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
