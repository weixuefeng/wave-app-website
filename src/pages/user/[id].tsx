/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 16:55:35
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:28:11
 * @FilePath: /wave-app-website/src/pages/user/[id].tsx
 */
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import usePagination from 'hooks/usePagination'
import { getTradeNameByType, MyAsset } from 'model/asset'
import { PageModel } from 'model/navModel'
import { UserInfo } from 'model/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'
import { getAssetDetailPathByInfo } from 'utils/route'

export default function UserPage() {
  const { t } = useTranslation()
  const router = useRouter()
  let pageModel = new PageModel('User', 'WAVE', '')
  const { id } = router.query

  const ref = useRef(null)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const { hasMore, isLoading, currentPage, data, error } = usePagination<MyAsset>(ref, fetchData)

  useEffect(() => {
    getUserInfo()
  }, [])

  if (!id) {
    return <>error page</>
  }

  const userId = parseInt(id.toString())

  function getUserInfo() {
    Http.getInstance()
      .getUserInfo(userId)
      .then(response => {
        setUserInfo(response)
      })
      .catch(error => {
        // todo:// add error page
        Log.e(error)
      })
  }

  function fetchData(page) {
    return Http.getInstance().getOtherAssetList(userId, page)
  }

  if (!userInfo) {
    return <>...</>
  }

  function content() {
    return (
      <>
        <div className="container mx-auto">
          <div className="user-page">
            <div className="user-profile">
              <img src={userInfo.avatar} alt={userInfo.name} />
              <div className="user-info">
                <p className="name">{userInfo.name}</p>
                <p className="id">UID: {userInfo.id}</p>
              </div>
            </div>
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
          </div>
        </div>
      </>
    )
  }
  return NormalLayoutComponent(content(), pageModel)
}
