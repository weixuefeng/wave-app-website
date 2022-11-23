/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-08 16:10:11
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-23 20:12:24
 * @FilePath: /wave-app-webiste/src/components/dialog/MyoffersAcceDialog.tsx
 */
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MyoffersAcceDialog() {
  const { t } = useTranslation()
  return (
    <div className="dialog-buy-successful">
      <div className="flex justify-center">
        <img className="h-auto w-48" src="/assets/image/icon_done.png" alt="done" />
      </div>
      <h2>
        <>{t('SOLD_SUCCESSFULLY')}</>
      </h2>
      <div className="content">{t('THE_OBTAINED')}</div>
      <div className="action">
        <Link href="/wallet">{t('CHECK_BLALANCE')}</Link>
      </div>
    </div>
  )
}
