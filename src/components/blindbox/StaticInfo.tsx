/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 18:07:28
 * @FilePath: /wave-app-webiste/src/components/blindbox/StaticInfo.tsx
 */

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { CollectionInfo } from 'model/collection_model'

export default StaticInfo

function StaticInfo(props) {
  let { collectionInfo } = props
  const { t } = useTranslation()
  const info = collectionInfo as CollectionInfo

  return (
    <>
      <div className="info-content">
        <h3>{t('INTRODUCTION')}</h3>
        <p>{collectionInfo.description}</p>
      </div>
      <div className="info-content info-evt">
        <h3>{t('WHAT_IS_EVT')}</h3>
        <p>
          {t('WHAT_IS_EVT_INFO')}
          <Link href="https://www.newtonproject.org/en/evt/">
            <a target="_blank">...{t('MORE')}</a>
          </Link>
        </p>
      </div>
    </>
  )
}
