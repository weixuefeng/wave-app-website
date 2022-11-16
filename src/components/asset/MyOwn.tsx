/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:42:02
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-16 17:47:23
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

export default function Myown(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myOwnData, setMyOwnData] = useState<Array<AssetsMyOwnData>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (currentUser) {
      getMyAssetList()
    }
  }, [currentUser])

  function getMyAssetList() {
    setIsLoading(true)
    Http.getInstance()
      .getMyAssetList(currentUser.id, currentPage)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setMyOwnData(response.data)
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            // update current page
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        } else {
          // more page
          setMyOwnData(myOwnData.concat(response.data))
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          getMyAssetList()
        }
      }
    }
  }

  return (
    <>
      <div className="my-own">
        {myOwnData?.map((item, index) => {
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
      <button ref={ref} className="primary black mb-10" onClick={() => getMyAssetList()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </>
  )
}
