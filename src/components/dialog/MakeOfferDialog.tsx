import { DatePicker, DatePickerProps, TimePicker, Input, Col, Row, Divider } from 'antd'
import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import 'antd/dist/antd.css'
export default function MakeOfferDialog(props) {
  const { nftDetail, showPassword, setOfferEndTime, setOfferPrice } = props
  const wallet = useWallet()
  const info = nftDetail as NFTDetail
  if (!info || !wallet) {
    return <></>
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    // todo: check end time must > now
    setOfferEndTime(parseInt((date.toDate().getTime() / 1000).toString()))
  }

  const onPriceChange = e => {
    setOfferPrice(e.target.value)
  }

  return (
    <div className="dialog-make-offer">
      <p className="title">Make Offer</p>
      {/** asset info */}
      <div className="asset-info">
        <img src={info.image} alt={info.name} />
        <div>
          <p>{info.name.substring(0, info.name.indexOf('#'))}</p>
          <p>{`#${info.name.lastIndexOf('#')}`}</p>
        </div>
      </div>
      {/** bid info */}
      <div className="bid-info">
        <div className="item">
          <p className="label">Highest Bid:</p>
          <p className="value">{info.highest_bid_price} NEW</p>
        </div>
        <div className="item ml-2 pl-3">
          <p className="label">Lowest Bid:</p>
          <p className="value">{info.lowest_bid_price} NEW</p>
        </div>
      </div>

      {/** offer info */}
      <div className="offer-info">
        <Row gutter={16} className="item">
          <Col span={16}>
            <p className="title">Offer valid thru</p>
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker placeholder={'Date'} placement={'bottomRight'} onChange={onChange} />
              </Col>
              <Col span={12}>
                <TimePicker placeholder={'Time'} placement={'bottomRight'} onChange={onChange} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <p className="title">Price</p>
            <Input suffix="NEW" onChange={onPriceChange} />
          </Col>
        </Row>
      </div>

      <Divider className="my-2" />

      {/** balance info */}
      <div className="balance-info">
        <div className="item">
          <p>Account Balance:</p>
          <p>{wallet.available_balance} NEW</p>
        </div>
      </div>

      <button
        className="primary black"
        onClick={() => {
          showPassword()
        }}
      >
        Next
      </button>
    </div>
  )
}
