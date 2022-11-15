import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import { splitAddress } from 'utils/functions'
import { Divider, Tooltip } from 'antd'

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
        <div>
          <p>{info.name.substring(0, info.name.indexOf('#'))}</p>
          <p>{`#${info.name.lastIndexOf('#')}`}</p>
        </div>
      </div>
      {/** sell info */}
      <div className="sell-info">
        <div className="item">
          <p>Price</p>
          <p>{info.lowest_bid_price} NEW</p>
        </div>
        <div className="item py-4">
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
        <div className="item my-2">
          <p>
            <span>Creator Earnings</span>
            <Tooltip placement="top" title="The creator(s) of this asset willreceive 5% for every sale.">
              <img className="img-qus" src="/assets/image/icon-ques.png" alt="" />
            </Tooltip>
          </p>
          <p>200 NEW</p>
        </div>
        <div className="item">
          <p>
            <span>Transaction Fee</span>
            <Tooltip placement="top" title="Wave platform transaction fee 2.5%.">
              <img className="img-qus" src="/assets/image/icon-ques.png" alt="" />
            </Tooltip>
          </p>
          <p>200 NEW</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/** balance info */}
      <div className="balance-info">
        <p>Account Balance</p>
        <p>{wallet.available_balance} NEW</p>
      </div>

      <button className="primary black">Next</button>
    </div>
  )
}
