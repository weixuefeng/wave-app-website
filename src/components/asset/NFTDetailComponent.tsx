import { NFTDetail } from 'model/nft_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import CountDownComponent from './detail/CountDownComponent'
import ChainInfoComponent from './ChainInfoComponent'
import PropertiesComponents from './PropertiesComponents'

export default function NFTDetailComponent(props) {
  const { id } = props

  const [nftDetail, setNFTDetail] = useState<NFTDetail>(null)

  useEffect(() => {
    Http.getInstance()
      .getNFTInfo(parseInt(id))
      .then(response => {
        console.log(response)
        setNFTDetail(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  if (!nftDetail || !id) {
    return <>loading...</>
  }

  return (
    <div className="nft-detail">
      <div className="info">
        <img src={nftDetail.image} alt={nftDetail.name} />
        <div className="detail">
          <h2>{nftDetail.name}</h2>
          {/** owner info */}
          <div className="owner">
            <div className="tl">
              <img src={nftDetail.collection.image} alt={nftDetail.user.name} />
              <p>{nftDetail.collection.name}</p>
            </div>
            <div className="tr">
              <p>Owned by</p>
              <p className="name">{nftDetail.user.name}</p>
            </div>
          </div>
          {/** count down */}
          <CountDownComponent endTime={nftDetail.sell_end_time} serverTime={nftDetail.server_time} />
          {/** price info */}
          <div className="price">
            <div>
              <p className="label">Hightest Bid:</p>
              <p className="value">{nftDetail.highest_bid_price} NEW</p>
            </div>
            <div>
              <p className="label">Floor Price:</p>
              <p className="value">{nftDetail.lowest_bid_price} NEW</p>
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
            address={nftDetail.chain_info.contract_address}
            tokenStandard={nftDetail.chain_info.token_standard}
            blockChain={nftDetail.chain_info.block_chain}
            creatorEariningPercent={nftDetail.creator_earnings_percent}
          />
          {nftDetail.properties.length > 0 && (
            <>
              <h2>Properties</h2>
              <PropertiesComponents properties={nftDetail.properties} />
            </>
          )}
        </div>
        <div className="intro">
          <h2>Introduction</h2>
          <div className="content">
            <p>{nftDetail.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
