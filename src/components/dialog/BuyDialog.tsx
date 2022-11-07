import React from 'react'

export default function BuyDialog() {
  return (
    <div className="dialog-buy">
      <p className="title">Buy</p>
      {/** asset info */}
      <div className="asset-info">
        <img src="" alt="" />
        <p>Remeeafaef</p>
      </div>
      {/** sell info */}
      <div className="sell-info">
        <div className="item">
          <p>Price</p>
          <p>100,000 NEW</p>
        </div>
        <div className="item">
          <p>From</p>
          <p>NEW182xxxqwfa</p>
        </div>
        <div className="item">
          <p>To</p>
          <p>NEW182XXXsfa</p>
        </div>
      </div>

      {/** price & seller info */}
      <div className="price-info">
        <p>Total</p>
        <p>100,0000 NEW</p>
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
        <p>50,000 NEW</p>
      </div>

      <button className="primary black">Next</button>
    </div>
  )
}
