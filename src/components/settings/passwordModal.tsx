/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-21 20:14:02
 * @FilePath: /wave-app-website/src/components/settings/passwordModal.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import { EmailAction, UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'
import {t} from "i18next";

export default function PasswordModal(props) {
  let [isOpen, setIsOpen] = useState(false)
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function requestVerifyCode() {
    Http.getInstance()
      .requestVerifyCode(currentUser.email, EmailAction.PAYMENT_PASSWORD)
      .then(response => {
        Log.e(response)
      })
      .catch(error => {
        Log.e(error)
      })
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
        <h2>Modify Payment Password</h2>
        <div className={'password-box'}>
          <div className="email">
            <label htmlFor="email" className="label">
              New Email Address
            </label>
            <p className="emailed">{currentUser?.email}</p>
          </div>

          <div className="code-box">
            <label htmlFor="text" className="label">
              Email Verification Code
            </label>
            <input
              placeholder="Verification Code"
              onChange={e => {
                setEmailCode(e.target.value)
              }}
            />
            <img src="assets/image/icon_code.png" alt="code" />
            <button className="send-code" onClick={requestVerifyCode}>
              <span>
                <>{t('SEND_CODE')}</>
              </span>
            </button>
          </div>

          <div className="password">
            <label htmlFor="password" className="label">
              Please Enter the Six-digit Password
            </label>
            <input
              placeholder="Please Enter the Six-digit Password"
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
            <img src="assets/image/icon_password.png" alt="password icon" />
          </div>

          <div className="password">
            <label htmlFor="password" className="label">
              Enter The Transaction Password Again
            </label>
            <input
              placeholder="Enter The Transaction Password Again"
              onChange={e => {
                setConfirmPassword(e.target.value)
              }}
            />
            <img src="assets/image/icon_passworded.png" alt="passworded icon" />
          </div>

          <button className="primary black" disabled={confirmLoading} onClick={requestUpdatePassword}>
            <span>Confirm {confirmLoading && '...'}</span>
          </button>
        </div>
      </div>
    )
  }
  return (
    <li>
      <p>Modify Payment Password</p>
      <div>
        <span className="left">{currentUser?.payment_password_set == 1 ? '******' : 'unset'}</span>
        <span className="edit" onClick={openModal}>
          Edit
        </span>
      </div>
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        {dialogContent()}
      </DialogComponent>
    </li>
  )
}
