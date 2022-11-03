/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-03 13:34:01
 * @FilePath: /wave-app-webiste/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import Http from 'services/http'
import BannerComponent from 'components/home/BannerComponent'
import { Banner, Mystery, Recommend } from 'model/banner'
import HomeDataComonent from 'components/home/HomeDataComonent'
export default Home

function Home() {
  let pageModel = new PageModel('HOME', 'WAVE', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  const [banners, setBanners] = useState<Array<Banner>>([])
  const [homeData, setHomeData] = useState<any>()
  const [mysteryData, setMysteryData] = useState<Array<Mystery>>([])
  const [recommendData, setRecommendData] = useState<Array<Recommend>>([])

  useEffect(() => {
    getHomeData()
    getHomeBanner()
  }, [])

  const getHomeBanner = async () => {
    Http.getInstance()
      .getHomeBanner()
      .then(response => {
        setBanners(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getHomeData = async () => {
    Http.getInstance()
      .getHomeList()
      .then(response => {
        setHomeData(response)
        setMysteryData(response.mystery_boxes)
        setRecommendData(response.recommend)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={'container mx-auto'}>
      <div className={'home'}>
        <BannerComponent banners={banners} />
        <HomeDataComonent homeData={homeData} />
      </div>
    </div>
  )
}
