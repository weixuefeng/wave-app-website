import React, { useState } from 'react'
import InputGroup from 'react-input-groups'
import 'react-input-groups/lib/css/styles.css'
import { t } from 'i18next'

export default function PasswordDialog(props) {
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
          cancel
        </button>
        <button className="primary short black" onClick={onComplete}>
          Confirm
        </button>
      </div>
    </div>
  )
}
