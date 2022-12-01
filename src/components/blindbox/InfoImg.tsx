/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-01 16:57:56
 * @FilePath: /wave-app-webiste/src/components/blindbox/InfoImg.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'
import i18n from 'i18n'

export default InfoImg

function InfoImg(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  function soldOut() {
    if (collectionInfo.sell_status !== 0 && collectionInfo.sell_status !== 1) {
      return (
        <>
          {/* English */}
          {i18n.language == 'en' ? (
            <img src="/assets/image/sold_out_en.png" className="sole" alt="sole out" />
          ) : (
            <img src="/assets/image/sold_out_zh.png" className="sole" alt="sole out" />
          )}
        </>
      )
    }
  }

  return (
    <div className="info-img">
      <img className="img" src={collectionInfo.image} alt={collectionInfo.name} />
      {soldOut()}
    </div>
  )
}
