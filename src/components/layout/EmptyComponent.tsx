/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 16:11:14
 * @FilePath: /wave-app-webiste/src/components/layout/EmptyComponent.tsx
 */

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function EmptyComponent(props) {
  const { t } = useTranslation()
  return (
    <div className="container text-center">
      <img className="mx-auto mt-32 h-auto w-60" src="/assets/image/icon_no_data.png" alt="no data" />
      <h3 className="mt-11 mb-28 text-xl text-grayc7">
        <>{t('NO_DATREA')}</>
      </h3>
    </div>
  )
}
