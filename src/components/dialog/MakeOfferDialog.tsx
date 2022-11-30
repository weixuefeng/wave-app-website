import { DatePicker, DatePickerProps, TimePicker, Input, Col, Row, Divider } from 'antd'
import useWallet from 'hooks/userWallet'
import { EVTCopyDetail } from 'model/evt_asset'
import { NFTDetail } from 'model/nft_asset'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Log from 'utils/log'

export default function MakeOfferDialog(props) {
  const { t } = useTranslation()
  const { nftDetail, evtDetail, showPassword, offerEndTime, setOfferEndTime, offerPrice, setOfferPrice } = props
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
    setOfferEndTime(parseInt((endDate.getTime() / 1000).toString()))
  }

  const onTimeChange: DatePickerProps['onChange'] = (date, dateString) => {
    let selectedDate = date.toDate()
    endDate.setHours(selectedDate.getHours())
    endDate.setMinutes(selectedDate.getMinutes())
    endDate.setSeconds(selectedDate.getSeconds())
    Log.d(endDate)
    setEndDate(endDate)
    setOfferEndTime(parseInt((endDate.getTime() / 1000).toString()))
  }

  const onPriceChange = e => {
    setOfferPrice(e.target.value)
  }

  function isValue() {
    let timestamp = new Date().getTime() / 1000
    if (offerPrice > wallet.available_balance || offerPrice == '0' || offerEndTime == '' || timestamp > offerEndTime)
      return
    showPassword()
  }

  return (
    <div className="dialog-make-offer">
      <h2 className="title">{t('MAKE_OFFER')}</h2>
      {/** asset info */}
      <div className="asset-info">
        <div className="info-img">
          <img src={info.image} alt={info.name} />
        </div>
        <div>
          <h3>{info.name.substring(0, info.name.indexOf('#'))}</h3>
          <h3>{`#${info.name.lastIndexOf('#')}`}</h3>
        </div>
      </div>
      {/** bid info */}
      <div className="bid-info">
        <div className="item">
          <p className="label">{t('HIGHEST_BID')}:</p>
          <p className="value">{info.highest_bid_price} NEW</p>
        </div>
        <div className="item ml-2 pl-3">
          <p className="label">{t('FLOOR_PRICE')}:</p>
          <p className="value">{info.lowest_bid_price} NEW</p>
        </div>
      </div>

      {/** offer info */}
      <div className="offer-info">
        <Row gutter={16} className="item">
          <Col span={16}>
            <p className="title">{t('OFFER_VALID_THRU')}</p>
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker placeholder={t('DATE')} placement={'bottomRight'} onChange={onDateChange} />
              </Col>
              <Col span={12}>
                <TimePicker placeholder={t('TIME')} placement={'bottomRight'} onChange={onTimeChange} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <p className="title">{t('PRICE')}</p>
            <Input suffix="NEW" onChange={onPriceChange} />
          </Col>
        </Row>
      </div>

      {/** balance info */}
      <div className="balance-info">
        <div className="info-total">
          <p>{t('TOTAL')}</p>
          <p>{offerPrice} NEW</p>
        </div>
        <div className="item">
          <p>{t('ACCOUNT_BALANCE')}:</p>
          <p>{wallet.available_balance} NEW</p>
        </div>
      </div>

      <button
        className="primary black widthMargin"
        onClick={() => {
          isValue()
        }}
      >
        <>{t('NEXT')}</>
      </button>
    </div>
  )
}
