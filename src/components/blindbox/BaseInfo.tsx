/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 14:40:14
 * @FilePath: /wave-app-webiste/src/components/blindbox/BaseInfo.tsx
 */

import React from 'react'
import { CollectionInfo, IssueType } from 'model/collection_model'
import { useTranslation } from 'react-i18next'

export default BaseInfo

function BaseInfo(props) {
  const { t } = useTranslation()
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
          <span>{t('REMAINING')}</span>
          {collectionInfo.box_total - collectionInfo.sold_quantity > 0
            ? collectionInfo.box_total - collectionInfo.sold_quantity
            : 0}
        </p>
        <p className="ml-8">
          <span>{info.issue_type == IssueType.LIMIT_ISSUE ? t('TOTAL_RELEASE') : t('CURRENT_RELEASE')}</span>
          {collectionInfo.box_total}
        </p>
      </div>
    </div>
  )
}
