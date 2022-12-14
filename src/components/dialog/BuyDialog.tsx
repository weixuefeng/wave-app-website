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
      <p className="title">{t('BUY')}</p>
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
          <p>{t('PRICE')}</p>
          <p>{info.price} NEW</p>
        </div>
        <div className="item py-4">
          <p>{t('FROM')}</p>
          <p>{splitAddress(wallet.wallet_address)}</p>
        </div>
        <div className="item">
          <p>{t('TO')}</p>
          <p>{splitAddress(info.user.wallet_address)}</p>
        </div>
      </div>

      {/** price & seller info */}
      <div className="price-info">
        <p>{t('TOTAL')}</p>
        <p>{info.price} NEW</p>
      </div>

      {/** receiver info */}
      <div className="receiver-info">
        <div className="item">
          <p>{t('SWLLER_WILLP_RECEIVE')}</p>
          <p>
            {info.price -
              (parseFloat(info.creator_earnings_percent.replace('%', '')) / 100) * info.price -
              info.price * parseFloat(settings?.nft_trade_fee)}{' '}
            NEW
          </p>
        </div>
        <div className="item my-2">
          <p>
            <span>
              {t('CEWATOR_EARNINGS')} ({info.creator_earnings_percent})
            </span>
            <Tooltip
              placement="top"
              title={`${t('THE_CRESTORS_OF')} ${info.creator_earnings_percent} ${t('FOR_EVERY_SALE')}.`}
            >
              <QuestionMarkCircleIcon className="ml-0.5 mb-0.5 inline-block w-4" />
            </Tooltip>
          </p>
          <p>{(parseFloat(info.creator_earnings_percent.replace('%', '')) / 100) * info.price} NEW</p>
        </div>
        <div className="item">
          <p>
            <span>
              {t('TRANSACTOION_FEE')}({parseFloat(settings?.nft_trade_fee) * 100}%)
            </span>
            <Tooltip placement="top" title={`${t('WAVE_FEE')} ${parseFloat(settings?.nft_trade_fee) * 100}%.`}>
              <QuestionMarkCircleIcon className="ml-0.5 mb-0.5 inline-block w-4" />
            </Tooltip>
          </p>
          <p>{info.price * parseFloat(settings?.nft_trade_fee)} NEW</p>
        </div>
      </div>

      <Divider className="my-4" />

      {/** balance info */}
      <div className="balance-info">
        <p>{t('WALLET_BALANCE')}</p>
        <p>{wallet.available_balance} NEW</p>
      </div>

      <button className="primary black" onClick={() => showPassword()}>
        <>{t('NEXT')}</>
      </button>
    </div>
  )
}
