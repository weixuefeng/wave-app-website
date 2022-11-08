import React, { useState } from 'react'
import InputGroup from 'react-input-groups'
import 'react-input-groups/lib/css/styles.css'

export default function PasswordDialog(props) {
  const { getPasswordValue, onCancel, onConfirm } = props

  const [value, setValue] = useState<string>()

  function onComplete() {
    onConfirm(value)
  }

  return (
    <div className="dialog-password">
      <p className="title">Payment Password</p>
      <div>
        <InputGroup getValue={setValue} length={6} type={'box'} />
      </div>
      <div className="action">
        <button className="primary black outline" onClick={onCancel}>
          cancel
        </button>
        <button className="primary short black" onClick={onComplete}>
          Confirm
        </button>
      </div>
    </div>
  )
}
