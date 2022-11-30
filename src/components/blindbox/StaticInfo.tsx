/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 17:21:44
 * @FilePath: /wave-app-webiste/src/components/blindbox/StaticInfo.tsx
 */

import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default StaticInfo

function StaticInfo(props) {
  const { t } = useTranslation()

  return (
    <>
      <div className="info-content">
        <h3>{t('INTRODUCTION')}</h3>
        <p>
          By accessing and placing an order with , you confirm that you are in agreement with and bound by the terms of
          service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any
          email or other type of communication between you and . Under no circumstances shall team be liable for any
          direct, indirect, special.
        </p>
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
