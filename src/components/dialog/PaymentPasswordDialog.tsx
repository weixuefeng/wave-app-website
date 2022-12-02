/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 18:42:29
 * @FilePath: /wave-app-webiste/src/components/dialog/PaymentPasswordDialog.tsx
 */

import { EmailAction, UserInfo } from 'model/user'
import React from 'react'
import { selectUser } from 'reducer/userReducer'
import { useAppSelector } from 'store/store'
import SendVerifyCodeButton from 'components/common/SendVerifyCodeButton'
import { useTranslation } from 'react-i18next'

export default function PaymentPasswordDialog(props) {
  const { t } = useTranslation()

  const currentUser = useAppSelector(selectUser) as UserInfo

  const { setEmailCode, isCode, setPassword, setConfirmPassword, isPassord, confirmLoading, requestUpdatePassword } =
    props

  return (
    <div className="dialog-settings-password">
      <h2>{currentUser?.payment_password_set == 1 ? t('MODIFY_PAYMENT_PASSWORD') : t('UNSET_PAYMENT_PASSWORD')}</h2>
      <div className={'password-box'}>
        <div className="email">
          <label htmlFor="email" className="label">
            {t('EMAIL_ADDRESS')}
          </label>
          <p className="emailed">{currentUser?.email}</p>
        </div>

        <div className="code-box">
          <label htmlFor="text" className="label">
            {t('EMAIL_VERIFY_CODE')}
          </label>
          <input
            placeholder={t('VERIFICATION_CODE')}
            onChange={e => {
              setEmailCode(e.target.value)
            }}
          />
          <SendVerifyCodeButton email={currentUser?.email} action={EmailAction.PAYMENT_PASSWORD} />
          {isCode ? <p className="error">{t('PLEASE_FILL_CODE')}</p> : null}
        </div>

        <div className="password">
          <label htmlFor="password" className="label">
            {t('TRANSACTION_PASSWORD')}
          </label>
          <input
            placeholder={t('TRANSACTION_PASSWORD_PLACEHOLDER')}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <img src="assets/image/icon_password.png" alt="password icon" />
        </div>

        <div className="password">
          <label htmlFor="password" className="label">
            {t('CONFIRM_TRANSACTION_PASSWORD')}
          </label>
          <input
            placeholder={t('CONFIRM_TRANSACTION_PASSWORD_PLACEHOLDER')}
            onChange={e => {
              setConfirmPassword(e.target.value)
            }}
          />
          <img src="assets/image/icon_passworded.png" alt="passworded icon" />
        </div>

        {isPassord ? <p className="error">{t('PASSWPORD_NOT_EQUALS')}</p> : null}

        <button className="primary black" disabled={confirmLoading} onClick={requestUpdatePassword}>
          <span>
            {t('CONFIRM')} {confirmLoading && '...'}
          </span>
        </button>
      </div>
    </div>
  )
}
