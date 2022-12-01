import DialogComponent from 'components/common/DialogComponent'
import BidSucceededDialog from 'components/dialog/BidSucceededDialog'
import BuyDialog from 'components/dialog/BuyDialog'
import BuySuccessfulDialog from 'components/dialog/BuySuccessfulDialog'
import LoginDialog from 'components/dialog/LoginDialog'
import MakeOfferDialog from 'components/dialog/MakeOfferDialog'
import PasswordDialog from 'components/dialog/PasswordDialog'
import SellAssetDialog from 'components/dialog/SellAssetDialog'
import LoadingCompontent from 'components/layout/LoadingCompontent'
import { AssetSellStatus } from 'model/asset'
import { EVTCopyDetail } from 'model/evt_asset'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'
import ChainInfoComponent from './ChainInfoComponent'
import PropertiesComponents from './PropertiesComponents'

export default function EVTDetailComponent(props) {
  const { t } = useTranslation()
  const { id } = props
  const [evtDetail, setEvtDetail] = useState<EVTCopyDetail>()

  const currentUser = useAppSelector(selectUser)

  // buy dialog
  const [isBuyOpen, setIsBuyOpen] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false)
  const [offerEndTime, setOfferEndTime] = useState(0)
  const [offerPrice, setOfferPrice] = useState('0')
  const [isOfferPasswordType, setIsOfferPasswordType] = useState(true)

  // sell nft dialog config
  const [isSellAssetOpen, setIsSellAssetOpen] = useState(false)
  const [sellPrice, setSellPrice] = useState('')
  const [sellExpiredTime, setSellExpiredTime] = useState('')
  const [directionAddress, setDirectionAddress] = useState(null)

  // login dialog
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const [isBidSucceeded, setBidSucceeded] = useState(false)
  const [isBuySucceeded, setBuySucceeded] = useState(false)
  const [isPassError, setIsPassError] = useState(false)

  function closeLoginModal() {
    setIsLoginOpen(false)
  }

  function closeBuyModal() {
    setIsBuyOpen(false)
  }

  function closePasswordModal() {
    setIsPasswordOpen(false)
  }

  function closeMakeOfferModal() {
    setIsMakeOfferOpen(false)
  }

  function closeSellAssetModal() {
    setIsSellAssetOpen(false)
  }

  function closeBidSucceededModal() {
    setBidSucceeded(false)
  }

  function closeBuySucceededModal() {
    setBuySucceeded(false)
  }

  function showPassword() {
    closeMakeOfferModal()
    closeBuyModal()
    closeSellAssetModal()
    setIsPasswordOpen(true)
    setIsPassError(false)
  }

  function requestOrderSell() {
    closeSellAssetModal()
    Http.getInstance()
      .requestOrderSell(evtDetail.id, sellPrice, sellExpiredTime, directionAddress)
      .then(response => {
        Log.d(response)
        loadData()
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function onConfirmPassword(value) {
    if (isOfferPasswordType) {
      // make offer
      Http.getInstance()
        .requestOrderBid(id, offerPrice, value, offerEndTime)
        .then(response => {
          // refresh page
          loadData()
          setBidSucceeded(true)
          closePasswordModal()
        })
        .catch(error => {
          Log.e(error)
          setIsPassError(true)
        })
    } else {
      // buy
      Http.getInstance()
        .requestOrderBuy(evtDetail.sell_id, value)
        .then(response => {
          // refresh page
          loadData()
          setBuySucceeded(true)
          closePasswordModal()
        })
        .catch(error => {
          Log.e(error)
          setIsPassError(true)
        })
    }
    setIsPassError(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  function showMakeOffer() {
    if (currentUser) {
      setIsMakeOfferOpen(true)
      setIsOfferPasswordType(true)
    } else {
      setIsLoginOpen(true)
    }
  }

  function showBuy() {
    if (currentUser) {
      setIsOfferPasswordType(false)
      setIsBuyOpen(true)
    } else {
      setIsLoginOpen(true)
    }
  }

  function cancelOrder() {
    Http.getInstance()
      .requestOrderCancel(evtDetail.sell_id)
      .then(response => {
        loadData()
        Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function OwnerActionComponent() {
    // owner
    if (evtDetail.is_sell == AssetSellStatus.SELLING) {
      return (
        <div className="action">
          <button
            className="primary ml-4 outline"
            onClick={() => {
              cancelOrder()
            }}
          >
            {t('CANCLE_OF_SALE')}
          </button>
        </div>
      )
    } else {
      return (
        <div className="action">
          <button
            className="primary ml-4 outline"
            onClick={() => {
              setIsSellAssetOpen(true)
            }}
          >
            {t('SALE')}
          </button>
        </div>
      )
    }
  }

  function NormalActionComponent() {
    // not owner
    if (evtDetail.is_sell == AssetSellStatus.SELLING) {
      return (
        <div className="action">
          <button
            className="primary black"
            onClick={() => {
              showBuy()
            }}
          >
            <>{t('BUY')}</>
          </button>
          <button
            className="primary black ml-4"
            onClick={() => {
              showMakeOffer()
            }}
          >
            <>{t('MAKE_OFFER')}</>
          </button>
        </div>
      )
    } else {
      return (
        <div className="action">
          <button
            className="primary black ml-4"
            onClick={() => {
              showMakeOffer()
            }}
          >
            <>{t('MAKE_OFFER')}</>
          </button>
        </div>
      )
    }
  }

  const loadData = async () => {
    await Http.getInstance()
      .getEvtCopyDetail(id)
      .then(response => {
        setEvtDetail(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  if (!evtDetail) {
    return <LoadingCompontent />
  }

  return (
    <div className="evt-detail">
      <div className="info">
        <div className="info-img">
          <img src={evtDetail.image} alt={evtDetail.name} />
        </div>
        <div className="detail">
          <h2>{evtDetail.name}</h2>
          <h3>EVT</h3>
          {/** price info */}
          <div className="price">
            <div>
              <p className="label">{t('HIGHEST_BID')}:</p>
              <p className="value">{evtDetail.highest_bid_price} NEW</p>
            </div>
            <div>
              <p className="label">
                <>{t('FLOOR_PRICE')}</>:
              </p>
              <p className="value">{evtDetail.lowest_bid_price} NEW</p>
            </div>
          </div>

          {/** action */}
          {currentUser && currentUser.id && currentUser.id == evtDetail.user.id
            ? OwnerActionComponent()
            : NormalActionComponent()}

          {evtDetail.license_url !== '' ? (
            <div className="licenes">
              <Link href={evtDetail.license_url}>
                <a target="_blank">
                  <span>{t('LICENSE')}</span>
                  <span>-&gt;</span>
                </a>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="chain-info">
        <div className="detail">
          <h2>{t('Details')}</h2>
          <ChainInfoComponent
            address={evtDetail.chain_info.contract_address}
            tokenStandard={evtDetail.chain_info.token_standard}
            blockChain={evtDetail.chain_info.block_chain}
            creatorEariningPercent={evtDetail.creator_earnings_percent}
            tipCreatorEarningsPercent={evtDetail.creator_earnings_percent}
          />
          {evtDetail.properties.length > 0 && (
            <>
              <h2>{t('PROPERTIES')}</h2>
              <PropertiesComponents properties={evtDetail.properties} />
            </>
          )}
        </div>
        <div className="intro">
          <h2>{t('INTRODUCTION')}</h2>
          <div className="content">
            <p>{evtDetail.introduction}</p>
          </div>
        </div>
      </div>

      {/** buy dialog */}
      <DialogComponent isOpen={isBuyOpen} closeModal={closeBuyModal}>
        <BuyDialog evtDetail={evtDetail} showPassword={showPassword} />
      </DialogComponent>

      {/** make offer dialog */}
      <DialogComponent isOpen={isMakeOfferOpen} closeModal={closeMakeOfferModal}>
        <MakeOfferDialog
          evtDetail={evtDetail}
          showPassword={showPassword}
          setOfferEndTime={setOfferEndTime}
          setOfferPrice={setOfferPrice}
        />
      </DialogComponent>

      {/** password dialog */}
      <DialogComponent isOpen={isPasswordOpen} closeModal={closePasswordModal}>
        <PasswordDialog onCancel={() => closePasswordModal()} onConfirm={onConfirmPassword} isPassError={isPassError} />
      </DialogComponent>

      {/* Bid Succeeded Dialog */}
      <DialogComponent isOpen={isBidSucceeded} closeModal={closeBidSucceededModal}>
        <BidSucceededDialog onCancel={() => closeBidSucceededModal()} />
      </DialogComponent>

      {/* buy Succeeded Dialog */}
      <DialogComponent isOpen={isBuySucceeded} closeModal={closeBuySucceededModal}>
        <BuySuccessfulDialog onCancel={() => closeBuySucceededModal()} />
      </DialogComponent>

      {/** sell asset dialog */}
      <DialogComponent isOpen={isSellAssetOpen} closeModal={closeSellAssetModal}>
        <SellAssetDialog
          evtDetail={evtDetail}
          showPassword={showPassword}
          setSellPrice={setSellPrice}
          setSellExpiredTime={setSellExpiredTime}
          requestOrderSell={requestOrderSell}
          setDirectionAddress={setDirectionAddress}
          tipCreatorEarningsPercent={evtDetail.creator_earnings_percent}
        />
      </DialogComponent>

      {/** login dialog */}
      <DialogComponent isOpen={isLoginOpen} closeModal={closeLoginModal}>
        <LoginDialog closeModal={closeLoginModal} />
      </DialogComponent>
    </div>
  )
}
