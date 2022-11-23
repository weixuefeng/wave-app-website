/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 20:01:59
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 20:38:00
 * @FilePath: /wave-app-webiste/src/components/dialog/BuySuccessfulDialog.tsx
 */

import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function BuySuccessfulDialog(props) {
  const { t } = useTranslation()
  return (
    <div className="dialog-buy-successful">
      <div className="flex justify-center">
        <img className="h-auto w-48" src="/assets/image/icon_done.png" alt="done" />
      </div>
      <h2>
        <>{t('PAYMENT_SUCCESSFUL')}</>
      </h2>
      <div className="content">{t('THE_OBTAINED')}</div>
      <div className="action">
        <Link href="/assets">{t('VIEW_RECORDS')}</Link>
      </div>
    </div>
  )
}
