/*
 * @Author: zxt0805 zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-01 14:44:52
 * @FilePath: /wave-app-webiste/src/components/home/HomeDataComonent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MysteryItem from 'components/home/mystery/mystery_item'
import RecommendItem from 'components/home/recommend/recommend_item'
import React from 'react'
import BlindBoxComponent from './BlindBoxComponent'

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
      <div className="blind">
        <p className="title">MyStery Box</p>
        <div className="flex flex-wrap justify-between">
          {blindBox &&
            blindBox.map((item, index) => {
              return (
                <div className="index-mystery-wrap" key={index}>
                  <MysteryItem collectionInfo={item} key={index} width="w-[343px]" height="h-[343px]" />
                </div>
              )
            })}
        </div>
      </div>

      <div className="recommend">
        <p className="title">Recommend</p>
        <div className="flex flex-wrap justify-between">
          {recommend &&
            recommend.map((item, index) => {
              return (
                <div className="index-mystery-wrap" key={index}>
                  <RecommendItem collectionInfo={item} key={index} width="w-[343px]" height="h-[193px]" />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
