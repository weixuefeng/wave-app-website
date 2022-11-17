/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:42:02
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 20:50:49
 * @FilePath: /wave-app-website/src/components/asset/MyOwn.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { AssetsMyOwnData, getAssetNameByType } from 'model/asset'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { UserInfo } from 'model/user'
import { useAppSelector } from 'store/store'
import { isInViewPort } from 'utils/functions'
import { getAssetDetailPathByInfo } from 'utils/route'
import Log from 'utils/log'
import Nodata from 'components/layout/NoData'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'

export default function Myown(props) {
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
                    <span className={getAssetNameByType(item.type) == 'nft' ? 'type' : ''}>
                      {getAssetNameByType(item.type)}
                    </span>
                    {item.status == 1 ? <p className="on-sale">On Sale</p> : null}
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
