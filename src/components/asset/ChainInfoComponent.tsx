/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 16:51:27
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-28 15:59:21
 * @FilePath: /wave-app-webiste/src/components/asset/ChainInfoComponent.tsx
 */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import copyContent, { splitAddress } from 'utils/functions'

export default function ChainInfoComponent(props) {
  const { t } = useTranslation()
  const { address, tokenStandard, blockChain, creatorEariningPercent } = props

  const [isShowToast, setIsShowToast] = useState(false)
  async function copyAddress(content) {
    await copyContent(content)
    setIsShowToast(true)
    setTimeout(() => {
      setIsShowToast(false)
    }, 3000)
  }

  return (
    <div className="chain-content">
      <div className="chain-item ">
        <p className="label">
          <>{t('CONTRACT_ADDRESS')}</>
        </p>
        <p className="value">
          {splitAddress(address)}
          <img src="/assets/image/icon_copy.png" onClick={() => copyAddress(address)} alt="copy" />
        </p>
      </div>
      <div className="chain-item ">
        <p className="label">
          <>{t('TOKEN_STANDARD')}</>
        </p>
        <p className="value">{tokenStandard}</p>
      </div>
      <div className="chain-item ">
        <p className="label">
          <>{t('BLOCKCHAIN')}</>
        </p>
        <p className="value">{blockChain}</p>
      </div>
      <div className="chain-item">
        <p className="label">
          <>{t('CREATOR_EARNINGS')}</>
        </p>
        <p className="value">
          {creatorEariningPercent}
          <img src="/assets/image/icon_deail.png" alt="deail" />
        </p>
      </div>
      {isShowToast && (
        <div className="toast">
          <img className="copied" src="/assets/image/copied.png" alt="copied" />
          <span>{t('COPIED')}</span>
        </div>
      )}
    </div>
  )
}
