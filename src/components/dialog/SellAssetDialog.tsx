import { Col, DatePicker, DatePickerProps, Divider, Input, Row, TimePicker } from 'antd'
import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import 'antd/dist/antd.css'

export default function SellAssetDialog(props) {
  const { nftDetail, showPassword, setSellExpiredTime, setSellPrice,requestOrderSell, setDirectionAddress} = props
  const wallet = useWallet()
  const info = nftDetail as NFTDetail
  if (!info || !wallet) {
    return <></>
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // todo: check end time must > now
    setSellExpiredTime(parseInt((date.toDate().getTime() / 1000).toString()).toString())
  }

  const onPriceChange = e => {
    setSellPrice(e.target.value)
  }

  return (
    <div className="dialog-make-offer">
      <p className="title">Sell NFT</p>

      {/** offer info */}
      <div className="offer-info">
        <Row gutter={16} className="item">
        <Col span={8}>
            <p className="title">Price</p>
            <Input suffix="NEW" onChange={onPriceChange} />
          </Col>
          <Col span={16}>
            <p className="title">Expiration date</p>
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker placeholder={'Date'} placement={'bottomRight'} onChange={onChange} />
              </Col>
              <Col span={12}>
                <TimePicker placeholder={'Time'} placement={'bottomRight'} onChange={onChange} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Divider className="my-2" />

      {/** private info */}
      <div className="private-info">
        <p>Private</p>
        <p>You can specify one address that is allowed to buy it.</p>
      </div>

      <div className="fee-info">
        <p>Fees <span>(Listing is free. the following fees will be deducted at the time of the sale)</span></p>
        <p>· Service Fee: 2.5%</p>
        <p>· Creator Earnings: 5%</p>
      </div>

      <button
        className="primary black"
        onClick={() => {
          requestOrderSell()
        }}
      >
        Submit
      </button>
    </div>
  )
}
