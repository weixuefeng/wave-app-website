/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:49:32
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-01 23:02:03
 * @FilePath: /wave-app-webiste/src/pages/assets.tsx
 */
import React from 'react'
import { Tab } from '@headlessui/react'
import Mylistings from 'components/asset/MyListings'
import MyOffersMade from 'components/asset/MyOffersMade'
import MyOffersReceived from 'components/asset/MyOffersReceived'
import Myown from 'components/asset/MyOwn'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import { PageModel } from 'model/navModel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Assets() {
  let pageModel = new PageModel('Assets', 'WAVE', '')
  const { t } = useTranslation()

  function content() {
    return (
      <div className="assets-page">
        <div className="container mx-auto pt-9">
          <div className="bread">
            <Link href="/">{t('HOME')}</Link> /{' '}
            <Link href="/assets">
              <a className="active">{t('ASSETS')}</a>
            </Link>
          </div>
          <h2 className="title">
            <>{t('ASSETS')}</>
          </h2>
          <div>
            <div className="hidden md:block">
              <Tab.Group>
                <Tab.List>
                  <Tab className="tab-item">
                    <>{t('MY_OWN')}</>
                  </Tab>
                  <Tab className="tab-item">
                    <>{t('MY_LISTINGS')}</>
                  </Tab>
                  <Tab className="tab-item">
                    <>{t('MY_OFFER_MADE')}</>
                  </Tab>
                  <Tab className="tab-item">
                    <>{t('MY_OFFER_RECEIVED')}</>
                  </Tab>
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
                      <Tab className="tab-item">
                        <>{t('MY_OWN')}</>
                      </Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">{t('MY_LISTINGS')}</Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">{t('MY_OFFER_MADE')}</Tab>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Tab className="tab-item">
                        <>{t('MY_OFFER_RECEIVED')}</>
                      </Tab>
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
  return NormalLayoutComponent(content(), pageModel)
}
