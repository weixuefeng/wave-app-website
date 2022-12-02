import useWallet from 'hooks/userWallet'
import { NFTDetail } from 'model/nft_asset'
import React from 'react'
import { splitAddress } from 'utils/functions'
import { Divider, Tooltip } from 'antd'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import useSettings from 'hooks/useSettings'
import { EVTCopyDetail } from 'model/evt_asset'
import { useTranslation } from 'react-i18next'

export default function BuyDialog(props) {
  const { t } = useTranslation()
  const { nftDetail, showPassword, evtDetail } = props
  const wallet = useWallet()
  const settings = useSettings()
  const info = (nftDetail as NFTDetail) || (evtDetail as EVTCopyDetail)

  if (!info || !wallet) {
    return <></>
  }

  return (
    <div className="dialog-buy">
      <p className="title">Buy</p>
      {/** asset info */}
      <div className="asset-info">
        <div className="info-img">
          <img src={info.image} alt={info.name} />
        </div>
        <div>
          <p>{info.name.substring(0, info.name.indexOf('#'))}</p>
          <p>{`#${info.name.lastIndexOf('#')}`}</p>
        </div>
      </div>
      {/** sell info */}
      <div className="sell-info">
        <div className="item">
          <p>Price</p>
          <p>{info.price} NEW</p>
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
        <p>{info.price} NEW</p>
      </div>

      {/** receiver info */}
      <div className="receiver-info">
        <div className="item">
          <p>Seller Will Receive</p>
          <p>
            {info.price -
              (parseFloat(info.creator_earnings_percent.replace('%', '')) / 100) * info.price -
              info.price * parseFloat(settings?.nft_trade_fee)}{' '}
            NEW
          </p>
        </div>
        <div className="item my-2">
          <p>
            <span>Creator Earnings</span>
            <Tooltip
              placement="top"
              title={`The creator(s) of this asset will receive ${info.creator_earnings_percent} for every sale.`}
            >
              <QuestionMarkCircleIcon className="ml-0.5 mb-0.5 inline-block w-4" />
            </Tooltip>
          </p>
          <p>{(parseFloat(info.creator_earnings_percent.replace('%', '')) / 100) * info.price} NEW</p>
        </div>
        <div className="item">
          <p>
            <span>Transaction Fee</span>
            <Tooltip
              placement="top"
              title={`Wave platform transaction fee ${parseFloat(settings?.nft_trade_fee) * 100}%.`}
            >
              <QuestionMarkCircleIcon className="ml-0.5 mb-0.5 inline-block w-4" />
            </Tooltip>
          </p>
          <p>{info.price * parseFloat(settings?.nft_trade_fee)} NEW</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/** balance info */}
      <div className="balance-info">
        <p>Account Balance</p>
        <p>{wallet.available_balance} NEW</p>
      </div>

      <button className="primary black" onClick={() => showPassword()}>
        <>{t('NEXT')}</>
      </button>
    </div>
  )
}
