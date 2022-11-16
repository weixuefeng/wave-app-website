/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-16 17:48:59
 * @FilePath: /wave-app-website/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import Http from 'services/http'
import BannerComponent from 'components/home/BannerComponent'
import { Banner } from 'model/banner'
import HomeDataComonent from 'components/home/HomeDataComonent'
import Log from 'utils/log'
export default Home

function Home() {
  let pageModel = new PageModel('HOME', 'WAVE', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  const [banners, setBanners] = useState<Array<Banner>>([])
  const [homeData, setHomeData] = useState<any>()

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
        Log.e(error)
      })
  }

  const getHomeData = async () => {
    Http.getInstance()
      .getHomeList()
      .then(response => {
        setHomeData(response)
      })
      .catch(error => {
        Log.e(error)
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
