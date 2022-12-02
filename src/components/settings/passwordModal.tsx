/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-10 16:18:52
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 19:23:02
 * @FilePath: /wave-app-webiste/src/components/settings/passwordModal.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import { UserInfo } from 'model/user'
import React, { useState } from 'react'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'
import { useTranslation } from 'react-i18next'
import PaymentPasswordDialog from 'components/dialog/PaymentPasswordDialog'

export default function PasswordModal(props) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectUser) as UserInfo
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isPassord, setIsPassword] = useState(false)

  function paymentCloseModal() {
    setIsPaymentOpen(false)
    setIsCode(false)
    setIsPassword(false)
    setEmailCode('')
    setPassword('')
    setConfirmPassword('')
  }

  function paymentOpenModal() {
    setIsPaymentOpen(true)
  }

  function requestUpdatePassword() {
    if (emailCode == '') {
      return setIsCode(true)
    }
    if (password != confirmPassword || password == '' || confirmPassword == '') {
      return setIsPassword(true)
    }
    setConfirmLoading(true)
    Http.getInstance()
      .requestUpdatePassword(emailCode, password)
      .then(response => {
        Log.d(response)
        paymentCloseModal()
        let newUser = {
          ...currentUser,
        }
        newUser.payment_password_set = 1
        dispatch(updateUserInfo(newUser))
        setIsCode(false)
        setIsPassword(false)
      })
      .catch(error => {
        Log.e(error)
        setIsCode(false)
        setIsPassword(false)
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  return (
    <li>
      <p>
        <>{t('PAYMENT_PASSWORD')}</>
      </p>
      <div>
        <span className="left">{currentUser?.payment_password_set == 1 ? '******' : t('UNSET')}</span>
        <span className="edit" onClick={paymentOpenModal}>
          {t('EDIT')}
        </span>
      </div>
      <DialogComponent isOpen={isPaymentOpen} closeModal={paymentCloseModal}>
        <PaymentPasswordDialog
          setEmailCode={setEmailCode}
          isCode={isCode}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          isPassord={isPassord}
          confirmLoading={confirmLoading}
          requestUpdatePassword={requestUpdatePassword}
        />
      </DialogComponent>
    </li>
  )
}
