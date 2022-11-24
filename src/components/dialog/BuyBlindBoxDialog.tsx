/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 19:52:13
 * @FilePath: /wave-app-webiste/src/components/dialog/BuyBlindBoxDialog.tsx
 */
import useWallet from 'hooks/userWallet'
import React from 'react'
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

  return (
    <div className="dialog-buy-blind-box">
      <h2>Complete checkout</h2>
      <div className='price'>
        <p>{t('PRICE')}</p>
        <p>{price} new</p>
      </div>

      <div className='price'>
        <p>{t('AMOUNT_NUM')}</p>
        <p>1</p>
      </div>

      <div className='total'>
        <p>{t('TOTAL')}</p>
        <p>{price} new</p>
      </div>

      <div className='info'>
        <p>· Creator Will Receive</p>
        <p>200 NEW</p>
      </div>

      <div className='info fee'>
        <p>· Transaction Fee(2.5%)</p>
        <p>200 NEW</p>
      </div>

      <div className='balance'>
        <p>{t('ACCOUNT_BALANCE')}</p>
        <p>{wallet?.available_balance} new</p>
      </div>

      <button
        className="button primary black"
        onClick={() => {
          setIsPasswordOpen(true)
          closeBuyModal()
        }}
      >
        {t('CONFIRM_PAYMENT')}
      </button>
    </div>
  )
}
