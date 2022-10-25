/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-10-25 11:47:16
 * @FilePath: /wave-app-webiste/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import BannerComponent from 'components/home/BannerComponent'
import { Banner } from 'model/banner'
import HomeDataComonent from 'components/home/HomeDataComonent'
import { HomeData } from 'model/asset'
import { useSelector } from 'react-redux'
import { selectUser } from 'reducer/userReducer'
import UserComponent from 'components/home/UserComponent'
export default Home

function Home() {
  let pageModel = new PageModel('HOME', 'WAVE', '')
  return <>{NormalLayout(Main(), pageModel)}</>
}

function Main() {
  const [banners, setBanners] = useState<Array<Banner>>([])
  const [homeData, setHomeData] = useState<HomeData>()

  useEffect(() => {
    getHomeData()
    getHomeBanner()
  }, [])

  const getHomeBanner = async () => {
    Http.getInstance()
      .getHomeBanner()
      .then(response => {
        setBanners(response.result.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getHomeData = async () => {
    Http.getInstance()
      .getHomeList()
      .then(response => {
        setHomeData(response.result)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className={'container'}>
      <div className={'home'}>
        <UserComponent/>
        <BannerComponent banners={banners} />
        <HomeDataComonent homeData={homeData} />
      </div>
    </div>
  )
}
