import useWallet from 'hooks/userWallet'
import { CollectionInfo } from 'model/collection_model'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'

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
      <div>
        <p>{t('PRICE')}</p>
        <p>{price} new</p>
      </div>

      <div>
        <p>{t('NUMBER')}</p>
        <p>1</p>
      </div>

      <div>
        <p>{t('TOTAL_PRICE')}</p>
        <p>{price} new</p>
      </div>

      <div>
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
        {t('CONFIRM_BUY')}
      </button>
    </div>
  )
}
