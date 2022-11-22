/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-22 17:18:30
 * @FilePath: /wave-app-website/src/components/settings/passwordModal.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import { EmailAction, UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'
import { t } from 'i18next'
import SendVerifyCodeButton from 'components/common/SendVerifyCodeButton'

export default function PasswordModal(props) {
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
          ...currentUser
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
            <SendVerifyCodeButton
              email={currentUser?.email}
              action={EmailAction.PAYMENT_PASSWORD}
            />
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
