/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 19:47:29
 * @FilePath: /wave-app-webiste/src/components/dialog/WalletReminderDialog.tsx
 */
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function WalletReminderDialog(props) {
  const { t } = useTranslation()

  return (
    <div className="dialog-wallet-reminder">
      <h2>{t('REMINDER')}</h2>
      <h3>{t('HOW_TO_GET_NEW')}</h3>
      <p>{t('YOU_NEED_TO_BUY')}</p>
    </div>
  )
}
