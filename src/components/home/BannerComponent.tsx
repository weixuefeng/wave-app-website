/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-10-31 11:20:18
 * @FilePath: /wave-app-webiste/src/components/home/BannerComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Image from 'next/image'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.min.css';

export default function BannerComponent(props) {
  const { banners } = props
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  if (banners && banners.length > 0) {
    return (
      <Swiper
        spaceBetween={10}
        initialSlide={1} // 初始化显示哪一个
        autoplay
        slidesPerView='auto'
        loop
        pagination={{
          "clickable": true
        }}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        threshold={40}
      >
        {banners.map((item, index) => {
          return <SwiperSlide key={index}><img alt="" src={item.image} /></SwiperSlide>
        })}
      </Swiper>
    )
  } else {
    return <></>
  }
}
