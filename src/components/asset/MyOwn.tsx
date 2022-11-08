/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:42:02
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 21:40:43
 * @FilePath: /wave-app-webiste/src/components/asset/MyOwn.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { AssetsMyOwnData, getAssetNameByType } from 'model/asset'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { UserInfo } from 'model/user'
import { useAppSelector } from 'store/store'

export default function Myown(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myOwnData, setMyOwnData] = useState<Array<AssetsMyOwnData>>()

  useEffect(() => {
    if (currentUser) {
      getMyAssetList()
    }
  }, [currentUser])

  function getMyAssetList() {
    Http.getInstance()
      .getMyAssetList(currentUser.id, 1)
      .then(response => {
        setMyOwnData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="my-own">
      {myOwnData?.map((item, index) => {
        return (
          <div className="item" key={index}>
            <Link href={''}>
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
  )
}
