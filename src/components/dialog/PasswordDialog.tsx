import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputGroup from 'react-input-groups'
import 'react-input-groups/lib/css/styles.css'

export default function PasswordDialog(props) {
  const { t } = useTranslation()
  const { getPasswordValue, onCancel, onConfirm } = props

  const [value, setValue] = useState<string>()

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
