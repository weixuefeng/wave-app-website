import { Col, DatePicker, DatePickerProps, Divider, Input, Row, TimePicker } from 'antd'
import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React, { useState } from 'react'
// import 'antd/dist/antd.css'
import { Disclosure } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { EVTCopyDetail } from 'model/evt_asset'
import Log from 'utils/log'

export default function SellAssetDialog(props) {
  const {
    nftDetail,
    showPassword,
    setSellExpiredTime,
    setSellPrice,
    requestOrderSell,
    setDirectionAddress,
    evtDetail,
  } = props
  const wallet = useWallet()
  const [endDate, setEndDate] = useState(new Date())

  const info = (nftDetail as NFTDetail) || (evtDetail as EVTCopyDetail)
  if (!info || !wallet) {
    return <></>
  }

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    // todo: check end time must > now
    let selectedDate = date.toDate()
    endDate.setFullYear(selectedDate.getFullYear())
    endDate.setMonth(selectedDate.getMonth())
    endDate.setDate(selectedDate.getDate())
    Log.d(endDate)
    setEndDate(endDate)
    setSellExpiredTime(parseInt((endDate.getTime() / 1000).toString()))
  }

  const onTimeChange: DatePickerProps['onChange'] = (date, dateString) => {
    let selectedDate = date.toDate()
    endDate.setHours(selectedDate.getHours())
    endDate.setMinutes(selectedDate.getMinutes())
    endDate.setSeconds(selectedDate.getSeconds())
    Log.d(endDate)
    setEndDate(endDate)
    setSellExpiredTime(parseInt((endDate.getTime() / 1000).toString()))
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
                <DatePicker placeholder={'Date'} placement={'bottomRight'} onChange={onDateChange} />
              </Col>
              <Col span={12}>
                <TimePicker placeholder={'Time'} placement={'bottomRight'} onChange={onTimeChange} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Divider className="my-2" />

      {/** private info */}
      <div className="private-info">
        <Disclosure>
          <Disclosure.Button className="flex flex-row items-center py-2 text-lg">
            <PlusCircleIcon className="h-8 w-8" />
            Private
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            <Input onChange={setDirectionAddress} />
            <p>You can specify one address that is allowed to buy it.</p>
          </Disclosure.Panel>
        </Disclosure>
      </div>

      <div className="fee-info">
        <p>
          Fees <span>(Listing is free. the following fees will be deducted at the time of the sale)</span>
        </p>
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
