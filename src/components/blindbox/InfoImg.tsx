/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:12:20
 * @FilePath: /wave-app-webiste/src/components/blindbox/InfoImg.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'

export default InfoImg

function InfoImg(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <div className="info-img">
      <img src={collectionInfo.image} alt={collectionInfo.name} />
    </div>
  )
}
