/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-01 11:04:34
 * @FilePath: /wave-app-webiste/src/components/dialog/PasswordDialog.tsx
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputGroup from 'react-input-type-groups'
import 'react-input-type-groups/lib/css/styles.css'

export default function PasswordDialog(props) {
  const { t } = useTranslation()
  const { getPasswordValue, onCancel, onConfirm, isPassError } = props

  const [value, setValue] = useState<string>()

  function onComplete() {
    onConfirm(value)
  }

  console.log('isPassError', isPassError)

  return (
    <div className="dialog-password">
      <h3 className="title">
        <>{t('PAYMENT_PASSWORD')}</>
      </h3>
      <div className="password">
        <InputGroup getValue={setValue} length={6} type={'box'} />
        {isPassError ? <p className="error">{t('INVSILD_PASSWORD')}</p> : null}
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
