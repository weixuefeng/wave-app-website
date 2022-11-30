/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 18:20:00
 * @FilePath: /wave-app-webiste/src/components/home/BannerComponent.tsx
 */

import React from 'react'
import Link from 'next/link'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

export default function BannerComponent(props) {
  const { banners } = props

  if (banners && banners.length == 1) {
    return (
      <div className="banner">
        <Swiper spaceBetween={10} autoplay slidesPerView="auto" loop pagination={{ clickable: true }} threshold={40}>
          {banners.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={item.url}>
                  <a target="_blank">
                    <img alt="" src={item.image} className="swiper-img" />
                  </a>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    )
  } else if (banners && banners.length > 1) {
    return (
      <div className="banner">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          autoplay
          slidesPerView="auto"
          loop
          pagination={{ clickable: true }}
          threshold={40}
        >
          {banners.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={item.url}>
                  <a target="_blank">
                    <img alt="" src={item.image} className="swiper-img" />
                  </a>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    )
  } else {
    return <></>
  }
}
