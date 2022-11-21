/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-21 17:15:21
 * @FilePath: /wave-app-website/src/components/blindbox/Description.tsx
 */

import React from 'react'
import { CollectionInfo } from 'model/collection_model'
import { useTranslation } from 'react-i18next'

export default Description

function Description(props) {
  let { collectionInfo } = props
  const { t } = useTranslation()
  const info = collectionInfo as CollectionInfo

  return (
    <div className="detail-description">
      <div>
        <h3>{t('DESCRIPTION')}</h3>
        <div className="description">
          <div className="text">{collectionInfo.description}</div>
        </div>
      </div>
    </div>
  )
}
