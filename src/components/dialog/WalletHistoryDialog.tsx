/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 00:04:33
 * @FilePath: /wave-app-webiste/src/components/dialog/WalletHistoryDialog.tsx
 */

import { Radio, RadioChangeEvent } from 'antd'
import { SelectCommonPlacement } from 'antd/lib/_util/motion'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function WalletHistoryDialog(props) {
  const { t } = useTranslation()

  // const {filterVal,setFilterVal} = props
  const [filterVal, setFilterVal] = useState('')
  // let deVal = <>{t('ALL')}</>

  // const [filterVal, setFilterVal] = useState('');

  // console.log('props',props)

  const filterChange = e => {
    setFilterVal(e.target.value)
    // console.log('e.target.value',e.target.value)
  }

  const walletHistory = [
    {
      value: 'All',
      text: t('ALL')
    },
    {
      value: 'Deposit',
      text: t('DEPOSIT')
    },
    {
      value: 'withdraw',
      text: t('WITHDRAW')
    },
    {
      value: 'Asset Sale',
      text: t('ASSET_SALE')
    }, 
    {
      value: 'Transfer',
      text: t('TRANSFER')
    }, {
      value: 'Ticket Purchase',
      text: t('TICKET_PURCHASE')
    }
  ]

  return (
    <div className="dialog-wallet-history">
      <h2 className="title">{t('FILTER')}</h2>
      <Radio.Group value={filterVal} onChange={filterChange}>
        {
          walletHistory.map((item, index) => {
            return (
              <Radio.Button key={index} value={item.value}>{item.text}</Radio.Button>
            )
          })
        }
      </Radio.Group>
    </div>
  )
}
