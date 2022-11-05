import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import { splitAddress } from 'utils/functions'

export default function BuyDialog(props) {
  const { nftDetail } = props
  const wallet = useWallet()
  const info = nftDetail as NFTDetail
  if (!info || !wallet) {
    return <></>
  }

  return (
    <div className="dialog-buy">
      <p className="title">Buy</p>
      {/** asset info */}
      <div className="asset-info">
        <img src={info.image} alt={info.name} />
        <p>{info.name}</p>
      </div>
      {/** sell info */}
      <div className="sell-info">
        <div className="item">
          <p>Price</p>
          <p>{info.lowest_bid_price} NEW</p>
        </div>
        <div className="item">
          <p>From</p>
          <p>{splitAddress(wallet.wallet_address)}</p>
        </div>
        <div className="item">
          <p>To</p>
          <p>{splitAddress(info.user.wallet_address)}</p>
        </div>
      </div>

      {/** price & seller info */}
      <div className="price-info">
        <p>Total</p>
        <p>{info.highest_bid_price} NEW</p>
      </div>

      {/** receiver info */}
      <div className="receiver-info">
        <div className="item">
          <p>Seller Will Receive</p>
          <p>200 NEW</p>
        </div>
        <div className="item">
          <p>Creator Earnings</p>
          <p>200 NEW</p>
        </div>
        <div className="item">
          <p>Transaction Fee</p>
          <p>200 NEW</p>
        </div>
      </div>
      <div className="divide"></div>
      {/** balance info */}
      <div className="balance-info">
        <p>Account Balance</p>
        <p>{wallet.available_balance} NEW</p>
      </div>

      <button className="primary black">Next</button>
    </div>
  )
}
