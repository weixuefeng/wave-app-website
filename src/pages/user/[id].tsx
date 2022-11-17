import NormalLayout from 'components/layout/NormalLayout'
import usePagination from 'hooks/usePagination'
import { getAssetNameByType, MyAsset } from 'model/asset'
import { PageModel } from 'model/navModel'
import { UserInfo } from 'model/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'
import { getAssetDetailPathByInfo } from 'utils/route'

export default function UserPage() {
  const router = useRouter()
  let pageModel = new PageModel('User', 'WAVE', '')
  const { id } = router.query

  const ref = useRef(null)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const { hasMore, isLoading, currentPage, data, error } = usePagination<MyAsset>(ref, getUserAssetList)

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

  console.log(data)

  function getUserAssetList() {
    return Http.getInstance().getOtherAssetList(userId, currentPage)
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
                <p className="id">UID: ${userInfo.id}</p>
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
            <button ref={ref} className="primary black mb-10" onClick={() => getUserAssetList()}>
              {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
            </button>
          </div>
        </div>
      </>
    )
  }
  return NormalLayout(content(), pageModel)
}
