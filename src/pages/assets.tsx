/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:49:32
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 18:53:44
 * @FilePath: /wave-app-webiste/src/pages/assets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import Myoffers from 'components/asset/MyOffers'
import Myown from 'components/asset/MyOwn'
import NormalLayout from 'components/layout/normalLayout'
import useWallet from 'hooks/userWallet'
import { AssetsMyOwnData } from 'model/asset'
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

  const [myOwnData,setMyOwnData] = useState<Array<AssetsMyOwnData>>()

  useEffect(() => {
    if (currentUser) {
      getMyAssetList()
      getOrderOnSale()
      getOrderOffer()
    }
  }, [currentUser])

  function getOrderOnSale() {
    Http.getInstance()
      .getOrderOnSale(currentUser.id, 1)
      .then(response => {
        console.log('getOrderOnSale', response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function getOrderOffer() {
    Http.getInstance()
      .getOrderOffer(currentUser.id, 1, OfferType.MADE)
      .then(response => {
        console.log('getOrderOffer', response)
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
        console.log('getMyAssetList', response)
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
                <Tab className="tab-item">My Offers</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Myown myOwnData={myOwnData} />
                </Tab.Panel>
                <Tab.Panel>
                  <Mylistings />
                </Tab.Panel>
                <Tab.Panel>
                  <Myoffers />
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
