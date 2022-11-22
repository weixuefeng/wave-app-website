/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-22 16:50:04
 * @FilePath: /wave-app-webiste/src/components/home/HomeDataComonent.tsx
 */
import RecommendItem from 'components/home/recommend/recommend_item'
import React from 'react'
import BlindBoxComponent from './BlindBoxComponent'
import RecommendComponent from './RecommendComponent'

export default function HomeDataComonent(props) {
  const { homeData } = props
  if (!homeData) {
    return <></>
  }
  const blindBox = homeData.mystery_boxes
  const recommend = homeData.recommend

  return (
    <div id="home" className="container">
      <BlindBoxComponent blindBox={blindBox} />
      <RecommendComponent recommend={recommend} />
    </div>
  )
}
