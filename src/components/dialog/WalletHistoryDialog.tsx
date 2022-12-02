/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 19:54:29
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:08:33
 * @FilePath: /wave-app-website/src/components/dialog/WalletHistoryDialog.tsx
 */

import { Radio, RadioChangeEvent } from 'antd'
import { SelectCommonPlacement } from 'antd/lib/_util/motion'
import { Options, WalletOptions } from 'model/wallet'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Http from 'services/http'
import Log from 'utils/log'

export default function WalletHistoryDialog(props) {
  const { t } = useTranslation()

  const { filterVal, setFilterVal, refreshData, closeModal } = props
  const [options, setOptions] = useState<Array<Options>>()

  const filterChange = e => {
    setFilterVal(e.target.value)
    closeModal()
  }

  const walletHistory = {
    label: t('ALL'),
    value: 0,
  }

  useEffect(() => {
    Http.getInstance()
      .requestWalletOptions()
      .then(response => {
        response.TRADE_TYPE.unshift(walletHistory)
        setOptions(response.TRADE_TYPE)
      })
      .catch(error => {
        Log.e(error)
      })
  }, [])

  return (
    <div className="dialog-wallet-history">
      <h2 className="title">{t('FILTER')}</h2>
      <Radio.Group value={filterVal} onChange={filterChange}>
        {options?.map((item, index) => {
          return (
            <Radio.Button key={index} value={item.value}>
              {item.label}
            </Radio.Button>
          )
        })}
      </Radio.Group>
    </div>
  )
}
