/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 19:39:15
 * @FilePath: /wave-app-webiste/src/components/dialog/BuyBlindBoxDialog.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import useWallet from 'hooks/userWallet'
import { UserInfo } from 'model/user'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import Log from 'utils/log'
import LoginDialog from './LoginDialog'
import PaymentPasswordDialog from './PaymentPasswordDialog'

export default function BuyBlindBoxDialog(props) {
  const { t } = useTranslation()
  const wallet = useWallet()
  const currentUser = useAppSelector<UserInfo>(selectUser)
  const router = useRouter()

  const {
    closeBuyModal,
    setIsPasswordOpen,
    mystery_box_id,
    price,
    is_whitelist_order,
    have_white_list,
    preemption_buy_limit,
    preemption_buy_limit_one_time,
    preemption_total_limit,
    current_user_in_white_list,
    buy_quantity_limit,
  } = props

  const [value, setValue] = useState(1)
  const [total, setTotal] = useState()
  const [isTit, setIsTit] = useState(false)

  // payment dialog
  const dispatch = useAppDispatch()
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

  function subtractionAmount() {
    setIsTit(false)
    if (value < 2) return
    setValue(value - 1)
  }

  function addAmount() {
    if (value > 9) {
      setIsTit(true)
      return
    }
    setIsTit(false)
    setValue(value + 1)
  }

  function showBlindbox() {
    if (currentUser) {
      if (currentUser.payment_password_set == 1) {
        setIsPasswordOpen(true)
        closeBuyModal()
      } else {
        setIsPaymentOpen(true)
      }
    }
  }

  function buttonStatus() {
    let priceAll = value * price
    if (parseInt(wallet?.available_balance) < priceAll) {
      return <button className="button primary black">{t('TOP_UP_TO_PAY')}</button>
    } else {
      return (
        <button className="button primary black" onClick={showBlindbox}>
          {t('CONFIRM_PAYMENT')}
        </button>
      )
    }
  }

  function titText() {
    return isTit ? <p className="tit">{t('MAXIMUM_OF')}</p> : null
  }

  return (
    <>
      <div className="dialog-buy-blind-box">
        <h2>{t('COMPLETE_CHECKOUT')}</h2>
        <div className="price">
          <p>{t('PRICE')}</p>
          <p>{price} NEW</p>
        </div>

        <div className="price">
          <p>{t('AMOUNT_NUM')}</p>
          <p className="amount">
            <span onClick={subtractionAmount}>
              <img src="/assets/image/icon_subtraction.png" alt="subtraction" />
            </span>
            <input type="text" placeholder="1" value={value}></input>
            <span onClick={addAmount}>
              <img src="/assets/image/icon_add.png" alt="add" />
            </span>
          </p>
          {titText()}
        </div>

        <div className="total">
          <p>{t('TOTAL')}</p>
          <p>{price * value} NEW</p>
        </div>

        <div className="balance">
          <p>{t('ACCOUNT_BALANCE')}</p>
          <p>{wallet?.available_balance} NEW</p>
        </div>
        {buttonStatus()}
      </div>

      {/* payment dialog */}
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
    </>
  )
}
