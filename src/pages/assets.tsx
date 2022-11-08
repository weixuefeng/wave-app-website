/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:49:32
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-08 21:20:06
 * @FilePath: /wave-app-website/src/pages/assets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import Myoffers from 'components/asset/MyOffers'
import Myown from 'components/asset/MyOwn'
import NormalLayout from 'components/layout/normalLayout'
import useWallet from 'hooks/userWallet'
import { AssetMyOfferData, AssetsMyOwnData, AssetsOrderOnSaleData } from 'model/asset'
import { PageModel } from 'model/navModel'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'

export default function Assets() {
  let pageModel = new PageModel('Trade', 'WAVE', '')
  const currentUser = useAppSelector(selectUser) as UserInfo

  const [myOwnData, setMyOwnData] = useState<Array<AssetsMyOwnData>>()
  const [myOrderOnSaleData, setMyOrderOnSaleData] = useState<Array<AssetsOrderOnSaleData>>()
  const [myMadeOffersData, setMyMadeOffersData] = useState<Array<AssetMyOfferData>>()
  const [myReceiveOffersData, setMyReceiveOffersData] = useState<Array<AssetMyOfferData>>()

  useEffect(() => {
    if (currentUser) {
      getMyAssetList()
      getOrderOnSale()
      getMadeOffer()
      getReceivedOffer()
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

  function getMadeOffer() {
    Http.getInstance()
      .getOrderOffer(currentUser.id, 1, OfferType.MADE)
      .then(response => {
        setMyMadeOffersData(response.data)
        console.log('made offer', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function getReceivedOffer() {
    Http.getInstance()
      .getOrderOffer(currentUser.id, 1, OfferType.RECEIVED)
      .then(response => {
        setMyReceiveOffersData(response.data)
        console.log('received offer', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

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

  function content() {
    return (
      <div className="assets-page">
        <div className="container mx-auto">
          <h2 className="title">Assets</h2>
          <div>
            <Tab.Group>
              <Tab.List>
                <Tab className="tab-item">My Own</Tab>
                <Tab className="tab-item mx-24">My Listings</Tab>
                <Tab className="tab-item mx-24">My Offers Made</Tab>
                <Tab className="tab-item mx-24">My Offers Received</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Myown myOwnData={myOwnData} />
                </Tab.Panel>
                <Tab.Panel>
                  <Mylistings myOrderOnSaleData={myOrderOnSaleData} />
                </Tab.Panel>
                <Tab.Panel>
                  <Myoffers myOffersData={myMadeOffersData} />
                </Tab.Panel>
                <Tab.Panel>
                  <Myoffers myOffersData={myReceiveOffersData} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    )
  }
  return NormalLayout(content(), pageModel)
}
