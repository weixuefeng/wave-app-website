/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:43:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 21:43:03
 * @FilePath: /wave-app-webiste/src/components/asset/MyListings.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AssetsOrderOnSaleData, getAssetNameByType } from 'model/asset'
import { UserInfo } from 'model/user'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export default function Mylistings(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myOrderOnSaleData, setMyOrderOnSaleData] = useState<Array<AssetsOrderOnSaleData>>()

  useEffect(() => {
    if (currentUser) {
      getOrderOnSale()
    }
  }, [currentUser])

  function getOrderOnSale() {
    Http.getInstance()
      .getOrderOnSale(currentUser.id, 1)
      .then(response => {
        setMyOrderOnSaleData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="my-listings">
      {myOrderOnSaleData?.map((item, index) => {
        return (
          <div className="item" key={index}>
            <Link href={''}>
              <a href="" className="cover">
                <div className="perfect-square">
                  <img src={item.nft.image} alt={item.nft.name} />
                  <span className={getAssetNameByType(item.nft.type) == 'nft' ? 'type' : ''}>
                    {getAssetNameByType(item.nft.type)}
                  </span>
                </div>
                <div className="name">
                  <h3>{item.nft.name}</h3>
                  <p className="list-price">
                    <span>List Price</span>
                    <span>Floor Difference</span>
                  </p>
                  <p className="price">
                    <span>{floorNum(item.price)} NEW</span>
                    <span>{formatDateTime(item.expire_time)}</span>
                  </p>
                  <div className="cancel">Cancel</div>
                </div>
              </a>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
