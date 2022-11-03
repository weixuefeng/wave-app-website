import { ClipboardDocumentIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { EVTDetail } from 'model/evt_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import copyContent, { splitAddress } from 'utils/functions'
import CountDownComponent from './detail/CountDownComponent'

export default function EVTDetailComponent(props) {
  const { id } = props
  const [evtDetail, setEvtDetail] = useState<EVTDetail>()

  useEffect(() => {
    getEvtDetail()
  })

  const getEvtDetail = async () => {
    await Http.getInstance()
      .getEvtDetail(id)
      .then(response => {
        setEvtDetail(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (!evtDetail) {
    return <></>
  }

  return (
    <div className="evt-detail">
      <div className="info">
        <img src={evtDetail.image} alt={evtDetail.name} />
        <div className="detail">
          <h2>{evtDetail.name}</h2>

          {/** price info */}
          <div className="price">
            <div>
              <p className="label">Hightest Bid:</p>
              <p className="value">{evtDetail.highest_bid_price} NEW</p>
            </div>
            <div>
              <p className="label">Floor Price:</p>
              <p className="value">{evtDetail.lowest_sell_price} NEW</p>
            </div>
          </div>
          {/** action */}
          <div className="action">
            <button className="primary">Buy</button>
            <button className="primary ml-4 outline">Make Offer </button>
          </div>
        </div>
      </div>

      <div className="chain-info">
        <div className="detail">
          <h2>Details</h2>
          <div className="content">
            <div className="item">
              <p className="label">Contract address</p>
              <p className="value">
                {splitAddress(evtDetail.detail.contract_address)}
                <ClipboardDocumentIcon onClick={() => copyContent(evtDetail.detail.contract_address)} />
              </p>
            </div>
            <div className="item">
              <p className="label">Token Standard</p>
              <p className="value">{evtDetail.detail.token_standard}</p>
            </div>
            <div className="item">
              <p className="label">Blockchain</p>
              <p className="value">{evtDetail.detail.block_chain}</p>
            </div>
            <div className="item">
              <p className="label">Creator Earnings</p>
              <p className="value">
                {evtDetail.creator_earnings_percent}
                <InformationCircleIcon />
              </p>
            </div>
          </div>
        </div>
        <div className="intro">
          <h2>Introduction</h2>
          <div className="content">
            <p>{evtDetail.introduction}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
