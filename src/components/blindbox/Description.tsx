/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 20:13:45
 * @FilePath: /wave-app-webiste/src/components/blindbox/Description.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'

export default Description

function Description(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <div className="detail-description">
      <div>
        <h3>Description</h3>
        <div className="description">
          <div className="text">{collectionInfo.description}</div>
        </div>
      </div>
    </div>
  )
}
