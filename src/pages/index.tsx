/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 00:16:30
 * @FilePath: /wave-app-webiste/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import { PageModel } from 'model/navModel'
import Http from 'services/http'
import BannerComponent from 'components/home/BannerComponent'
import { Banner } from 'model/banner'
import HomeDataComonent from 'components/home/HomeDataComonent'
import Log from 'utils/log'

export default function Home() {
  let pageModel = new PageModel('HOME', 'WAVE', '')

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

  function content() {
    return (
      <div className={'home'}>
        <BannerComponent banners={banners} />
        <div className={'container mx-auto'}>
          <HomeDataComonent homeData={homeData} />
        </div>
      </div>
    )
  }
  return <>{NormalLayoutComponent(content(), pageModel)}</>
}
