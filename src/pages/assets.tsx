/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:49:32
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-09 11:53:35
 * @FilePath: /wave-app-website/src/pages/assets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import MyOffersMade from 'components/asset/MyOffersMade'
import MyOffersReceived from 'components/asset/MyOffersReceived'
import Myown from 'components/asset/MyOwn'
import NormalLayout from 'components/layout/NormalLayout'
import { PageModel } from 'model/navModel'

export default function Assets() {
  let pageModel = new PageModel('Assets', 'WAVE', '')

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
                  <Myown />
                </Tab.Panel>
                <Tab.Panel>
                  <Mylistings />
                </Tab.Panel>
                <Tab.Panel>
                  <MyOffersMade />
                </Tab.Panel>
                <Tab.Panel>
                  <MyOffersReceived />
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
