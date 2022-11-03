/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-03 13:59:08
 * @FilePath: /wave-app-webiste/src/components/home/HomeDataComonent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
