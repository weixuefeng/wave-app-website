/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 21:46:20
 * @FilePath: /wave-app-webiste/src/components/dialog/BuyBlindBoxDialog.tsx
 */
import useWallet from 'hooks/userWallet'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function BuyBlindBoxDialog(props) {
  const { t } = useTranslation()
  const wallet = useWallet()

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

  function buttonStatus() {
    let priceAll = value * price
    if (parseInt(wallet?.available_balance) < priceAll) {
      return <button className="button primary black">{t('TOP_UP_TO_PAY')}</button>
    } else {
      return (
        <button
          className="button primary black"
          onClick={() => {
            setIsPasswordOpen(true)
            closeBuyModal()
          }}
        >
          {t('CONFIRM_PAYMENT')}
        </button>
      )
    }
  }

  function titText() {
    return isTit ? <p className="tit">{t('MAXIMUM_OF')}</p> : null
  }

  return (
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
  )
}
