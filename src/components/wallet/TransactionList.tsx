/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 17:13:45
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 14:24:35
 * @FilePath: /wave-app-webiste/src/components/wallet/TransactionList.tsx
 */
import { WalletTransaction } from 'model/wallet'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function TransactionComponent(props) {
  const { t } = useTranslation()
  const { item } = props
  const info = item as WalletTransaction

  function walletPrice(price) {
    let numPrice = price.charAt(0)
    if (numPrice == '-') {
      return <p className="buy">{price} NEW</p>
    } else {
      return <p className="income">{price} NEW</p>
    }
  }

  return (
    <div className="history-item">
      <h3>{item.trade_label}</h3>
      <div className="mt-4">
        <p className="label">
          <>{t('AMOUNT')}</>
        </p>
        {walletPrice(info.total)}
      </div>
      <div>
        <p className="label">
          <>{t('WALLET_BALANCE')}</>
        </p>
        <p>{info.wallet_balance} NEW</p>
      </div>
      <div>
        <p className="label">
          <>{t('TIME')}</>
        </p>
        <p>{new Date(info.created_at * 1000).toLocaleString()}</p>
      </div>
    </div>
  )
}
