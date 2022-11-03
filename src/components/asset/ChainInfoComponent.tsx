import { ClipboardDocumentIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import copyContent, { splitAddress } from 'utils/functions'

export default function ChainInfoComponent(props) {
  const {address, tokenStandard, blockChain, creatorEariningPercent} = props
  return (
    <div className="chain-content">
      <div className="chain-item ">
        <p className="label">Contract address</p>
        <p className="value">{splitAddress(address)}<ClipboardDocumentIcon onClick={() => copyContent(address)}/></p>
      </div>
      <div className="chain-item ">
        <p className="label">Token Standard</p>
        <p className="value">{tokenStandard}</p>
      </div>
      <div className="chain-item ">
        <p className="label">Blockchain</p>
        <p className="value">{blockChain}</p>
      </div>
      <div className="chain-item">
        <p className="label">Creator Earnings</p>
        <p className="value">{creatorEariningPercent}<InformationCircleIcon/></p>
      </div>
    </div>
  )
}
