/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 18:06:51
 * @FilePath: /wave-app-webiste/src/components/blindbox/Description.tsx
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
          <div className="text">{collectionInfo.picture_description}</div>
        </div>
      </div>
    </div>
  )
}
