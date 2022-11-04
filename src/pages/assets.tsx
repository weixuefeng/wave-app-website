/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-04 20:45:27
 * @FilePath: /wave-app-webiste/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import Myoffers from 'components/asset/MyOffers'
import Myown from 'components/asset/MyOwn'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import React, { useState, useEffect } from 'react'

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
                <Tab className="tab-item">My Offers</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Myown />
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
