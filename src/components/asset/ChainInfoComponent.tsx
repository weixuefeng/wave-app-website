import { ClipboardDocumentIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { t } from 'i18next'
import React from 'react'
import copyContent, { splitAddress } from 'utils/functions'

export default function ChainInfoComponent(props) {
  const { address, tokenStandard, blockChain, creatorEariningPercent } = props
  return (
    <div className="chain-content">
      <div className="chain-item ">
        <p className="label">
          <>{t('CONTRACT_ADDRESS')}</>
        </p>
        <p className="value">
          {splitAddress(address)}
          <ClipboardDocumentIcon onClick={() => copyContent(address)} />
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
    </div>
  )
}
