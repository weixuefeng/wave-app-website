import { EVTCopyDetail } from 'model/evt_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import ChainInfoComponent from './ChainInfoComponent'
import PropertiesComponents from './PropertiesComponents'

export default function EVTDetailComponent(props) {
  const { id } = props
  const [evtDetail, setEvtDetail] = useState<EVTCopyDetail>()

  useEffect(() => {
    getEvtDetail()
  })

  const getEvtDetail = async () => {
    await Http.getInstance()
      .getEvtCopyDetail(id)
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
              <p className="value">{evtDetail.lowest_bid_price} NEW</p>
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
          <ChainInfoComponent
            address={evtDetail.chain_info.contract_address}
            tokenStandard={evtDetail.chain_info.token_standard}
            blockChain={evtDetail.chain_info.block_chain}
            creatorEariningPercent={evtDetail.creator_earnings_percent}
          />
          {evtDetail.properties.length > 0 && (
            <>
              <h2>Properties</h2>
              <PropertiesComponents properties={evtDetail.properties} />
            </>
          )}
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
