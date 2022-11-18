/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 19:46:42
 * @FilePath: /wave-app-webiste/src/components/blindbox/BaseInfo.tsx
 */

import React from 'react'
import { CollectionInfo, IssueType } from 'model/collection_model'

export default BaseInfo

function BaseInfo(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <div className="baseinfo-box">
      <div className="title">
        <h2>{collectionInfo.name}</h2>
        <span>EVT</span>
      </div>
      <div className="number">
        <p>
          <span>Remaining</span>
          {collectionInfo.box_total - collectionInfo.sold_quantity > 0
            ? collectionInfo.box_total - collectionInfo.sold_quantity
            : 0}
        </p>
        <p className="ml-8">
          <span>{info.issue_type == IssueType.LIMIT_ISSUE ? 'Total release' : 'Current Release'}</span>
          {collectionInfo.box_total}
        </p>
      </div>
    </div>
  )
}
