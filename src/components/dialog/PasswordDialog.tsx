/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 18:55:25
 * @FilePath: /wave-app-webiste/src/components/dialog/PasswordDialog.tsx
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputGroup from 'react-input-groups'
import 'react-input-groups/lib/css/styles.css'

export default function PasswordDialog(props) {
  const { t } = useTranslation()
  const { getPasswordValue, onCancel, onConfirm } = props

  const [value, setValue] = useState<string>()

  // value?.replace(/./g,'*')  todo===
  function onComplete() {
    onConfirm(value)
  }

  return (
    <div className="dialog-password">
      <p className="title">
        <>{t('PAYMENT_PASSWORD')}</>
      </p>
      <div className="password">
        <InputGroup getValue={setValue} length={6} type={'box'} />
      </div>
      <div className="action">
        <button className="primary black mr-6 outline" onClick={onCancel}>
          <>{t('CANCEL')}</>
        </button>
        <button className="primary short black" onClick={onComplete}>
          <>{t('CONFIRM')}</>
        </button>
      </div>
    </div>
  )
}
