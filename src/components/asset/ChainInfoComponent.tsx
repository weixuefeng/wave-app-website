import { ClipboardDocumentIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { t } from 'i18next'
import React, { useState } from 'react'
import copyContent, { splitAddress } from 'utils/functions'

export default function ChainInfoComponent(props) {
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
          <ClipboardDocumentIcon onClick={() => copyAddress(address)} />
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
          <InformationCircleIcon />
        </p>
      </div>
      {isShowToast && (
        <div className="toast">
          <img className="copied" src="/assets/image/copied.png" />
          <span>Copied</span>
        </div>
      )}
    </div>
  )
}
