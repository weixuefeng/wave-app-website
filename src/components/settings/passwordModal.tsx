/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-01 16:13:11
 * @FilePath: /wave-app-webiste/src/components/settings/passwordModal.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import { EmailAction, UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'
import SendVerifyCodeButton from 'components/common/SendVerifyCodeButton'
import { useTranslation } from 'react-i18next'

export default function PasswordModal(props) {
  const { t } = useTranslation()
  let [isOpen, setIsOpen] = useState(false)
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useAppDispatch()
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function requestUpdatePassword() {
    //todo:// add password check
    if (password != confirmPassword) {
      alert('password not equals')
    }
    setConfirmLoading(true)
    Http.getInstance()
      .requestUpdatePassword(emailCode, password)
      .then(response => {
        Log.d(response)
        closeModal()
        let newUser = {
          ...currentUser,
        }
        newUser.payment_password_set = 1
        dispatch(updateUserInfo(newUser))
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  function dialogContent() {
    return (
      <div className="dialog-settings-password">
        <h2>
          {
            currentUser?.payment_password_set == 1 ?
              t('MODIFY_PAYMENT_PASSWORD') : t('UNSET_PAYMENT_PASSWORD')
          }
        </h2>
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

          <button className="primary black" disabled={confirmLoading} onClick={requestUpdatePassword}>
            <span>
              {t('CONFIRM')} {confirmLoading && '...'}
            </span>
          </button>
        </div>
      </div>
    )
  }
  return (
    <li>
      <p>
        <>{t('PAYMENT_PASSWORD')}</>
      </p>
      <div>
        <span className="left">{currentUser?.payment_password_set == 1 ? '******' : t('UNSET')}</span>
        <span className="edit" onClick={openModal}>
          {t('EDIT')}
        </span>
      </div>
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        {dialogContent()}
      </DialogComponent>
    </li>
  )
}
