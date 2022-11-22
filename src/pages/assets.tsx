/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:49:32
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-22 21:22:22
 * @FilePath: /wave-app-webiste/src/pages/assets.tsx
 */
import React from 'react'
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import MyOffersMade from 'components/asset/MyOffersMade'
import MyOffersReceived from 'components/asset/MyOffersReceived'
import Myown from 'components/asset/MyOwn'
import NormalLayout from 'components/layout/NormalLayout'
import { PageModel } from 'model/navModel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Assets() {
  let pageModel = new PageModel('Assets', 'WAVE', '')

  function content() {
    return (
      <div className="assets-page">
        <div className="container mx-auto">
          <h2 className="title">Assets</h2>
          <div>
            <div className="hidden md:block">
              <Tab.Group>
                <Tab.List>
                  <Tab className="tab-item">My Own</Tab>
                  <Tab className="tab-item mx-5 xl:mx-24">My Listings</Tab>
                  <Tab className="tab-item mx-5 xl:mx-24">My Offers Made</Tab>
                  <Tab className="tab-item mx-5 xl:mx-24">My Offers Received</Tab>
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
            <div className="block md:hidden">
              <Tab.Group>
                <Tab.List className="h5-list">
                  <Swiper modules={[Navigation, Pagination]} spaceBetween={5} slidesPerView={2.5}>
                    <SwiperSlide>
                      <Tab className="tab-item">My Own</Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">My Listings</Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">My Offers Made</Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">My Offers Received</Tab>
                    </SwiperSlide>
                  </Swiper>
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
      </div>
    )
  }
  return NormalLayout(content(), pageModel)
}
