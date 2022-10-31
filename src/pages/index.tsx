/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-12 19:08:34
 * @LastEditors: zxt0805 zhuxiaotong@diynova.com
 * @LastEditTime: 2022-10-31 18:09:22
 * @FilePath: /wave-app-webiste/src/pages/index.tsx
 */

import React, { useState, useEffect } from 'react'
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import BannerComponent from 'components/home/BannerComponent'
import { Banner, Mystery, Recommend } from 'model/banner'
import HomeDataComonent from 'components/home/HomeDataComonent'
import MysteryItem from 'components/mystery/mystery_item'
import RecommendItem from 'components/recommend/recommend_item'
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
        let res: any = response.result
        setHomeData(response.result)
        // console.log('homeData',response.result)
        setMysteryData(res.mystery_boxes)
        setRecommendData(res.recommend)
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
        <div className="flex flex-wrap justify-between">
        {
          mysteryData && mysteryData.map((item, index) => {
            return <div className='index-mystery-wrap' key={index}><MysteryItem collectionInfo={item} key={index} width="w-[343px]" height="h-[343px]" /></div>
          })
        }
        </div>

        <div className="flex flex-wrap justify-between">
        {
          recommendData && recommendData.map((item, index) => {
            return <div className='index-mystery-wrap' key={index}><RecommendItem collectionInfo={item} key={index} width="w-[343px]" height="h-[193px]" /></div>
          })
        }
        </div>
        <HomeDataComonent homeData={homeData} />
      </div>
    </div>
  )
}
