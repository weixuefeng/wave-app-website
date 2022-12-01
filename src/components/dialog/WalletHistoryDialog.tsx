/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-01 22:25:14
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

  return (
    <div className="dialog-wallet-history">
      <h2 className="title">{t('FILTER')}</h2>
      <Radio.Group value={filterVal} onChange={filterChange}>
        <Radio.Button value="All">{t('ALL')}</Radio.Button>
        <Radio.Button value="Deposit">{t('DEPOSIT')}</Radio.Button>
        <Radio.Button value="withdraw">{t('WITHDRAW')}</Radio.Button>
        <Radio.Button value="Asset Sale">{t('ASSET_SALE')}</Radio.Button>
        <Radio.Button value="Transfer">{t('TRANSFER')}</Radio.Button>
        <Radio.Button value="Ticket Purchase">{t('TICKET_PURCHASE')}</Radio.Button>
      </Radio.Group>
    </div>
  )
}
