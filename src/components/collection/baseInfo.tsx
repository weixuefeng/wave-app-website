/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 19:31:53
 * @FilePath: /wave-app-webiste/src/components/collection/baseInfo.tsx
 */

import React from 'react'
import { t } from 'i18next'
import { CollectionInfo, IssueType } from 'model/collection_model'

export default BaseInfo

function BaseInfo(props) {
  let { collectionInfo } = props
  const info = collectionInfo as CollectionInfo

  return (
    <div className="baseinfo-wrap">
      <p className="title">
        {collectionInfo.name}
        <span className="icon">EVT</span>
      </p>
      <div className="nums">
        <div className="nums-item">
          <span className="tip">
            <>{t('REMAINING')}</>
          </span>
          <span className="number">
            {collectionInfo.box_total - collectionInfo.sold_quantity > 0
              ? collectionInfo.box_total - collectionInfo.sold_quantity
              : 0}
          </span>
        </div>
        <div className="nums-item">
          <span className="tip">
            {info.issue_type == IssueType.LIMIT_ISSUE ? <>{t('TOTAL_RELEASE')}</> : <>{t('CURRENT_RELEASE')}</>}
          </span>
          <span className="number">{collectionInfo.box_total}</span>
        </div>
      </div>
    </div>
  )
}
