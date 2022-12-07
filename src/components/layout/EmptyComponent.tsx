/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-07 11:35:58
 * @FilePath: /wave-app-webiste/src/components/layout/EmptyComponent.tsx
 */

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function EmptyComponent(props) {
  const { t } = useTranslation()
  return (
    <div className="container text-center">
      <img className="mx-auto mt-12 h-auto w-60 md:mt-32" src="/assets/image/icon_no_data.png" alt="no data" />
      <h3 className="mt-7 mb-28 text-lg text-grayc7 md:mt-11 md:text-xl">
        <>{t('NO_DATREA')}</>
      </h3>
    </div>
  )
}
