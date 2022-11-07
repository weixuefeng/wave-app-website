import { DatePicker, DatePickerProps } from 'antd'
import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import { splitAddress } from 'utils/functions'

export default function MakeOfferDialog(props) {
  const { nftDetail } = props
  const wallet = useWallet()
  const info = nftDetail as NFTDetail
  if (!info || !wallet) {
    return <></>
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <div className="dialog-make-offer">
      <p className="title">Make Offer</p>
      {/** asset info */}
      <div className="asset-info">
        <img src={info.image} alt={info.name} />
        <p>{info.name}</p>
      </div>
      {/** bid info */}
      <div className="bid-info">
        <div className="item">
          <p className="label">Highest Bid:</p>
          <p className="value">{info.highest_bid_price} NEW</p>
        </div>
        <div className="item ml-2">
          <p className="label">Lowest Bid:</p>
          <p className="value">{info.lowest_bid_price} NEW</p>
        </div>
      </div>

      {/** offer info */}
      <div className="offer-info">
        <div className="item">
          <p className="title">Offer valid thru</p>
          <DatePicker placement={'bottomRight'} onChange={onChange} />
        </div>
        <div className="item">
          <p className="title">Price</p>
          <p>time</p>
        </div>
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
