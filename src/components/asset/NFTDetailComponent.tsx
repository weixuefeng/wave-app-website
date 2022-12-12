import { NFTDetail } from 'model/nft_asset'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import CountDownComponent from './detail/CountDownComponent'
import ChainInfoComponent from './ChainInfoComponent'
import PropertiesComponents from './PropertiesComponents'
import DialogComponent from 'components/common/DialogComponent'
import BuyDialog from 'components/dialog/BuyDialog'
import MakeOfferDialog from 'components/dialog/MakeOfferDialog'
import PasswordDialog from 'components/dialog/PasswordDialog'
import { AssetSellStatus } from 'model/asset'
import { useAppDispatch, useAppSelector } from 'store/store'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import SellAssetDialog from 'components/dialog/SellAssetDialog'
import Log from 'utils/log'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import LoginDialog from 'components/dialog/LoginDialog'
import Link from 'next/link'
import BidSucceededDialog from 'components/dialog/BidSucceededDialog'
import BuySuccessfulDialog from 'components/dialog/BuySuccessfulDialog'
import { useTranslation } from 'react-i18next'
import LoadingCompontent from 'components/layout/LoadingCompontent'
import { UserInfo } from 'model/user'
import { useRouter } from 'next/router'
import PaymentPasswordDialog from 'components/dialog/PaymentPasswordDialog'

export default function NFTDetailComponent(props) {
  const { t } = useTranslation()
  const { id } = props
  const currentUser = useAppSelector<UserInfo>(selectUser)

  const router = useRouter()

  const [nftDetail, setNFTDetail] = useState<NFTDetail>(null)
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
  const [isPassError, setIsPassError] = useState(false)
  const [isBalance, setIsbalance] = useState(false)
  const [isOfferEndTime, setIsOfferEndTime] = useState(false)

  // login dialog
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const [isBidSucceeded, setBidSucceeded] = useState(false)
  const [isBuySucceeded, setBuySucceeded] = useState(false)

  // payment dialog
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isPassord, setIsPassword] = useState(false)

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
  }

  // payment dialog
  function paymentCloseModal() {
    setIsPaymentOpen(false)
    setIsCode(false)
    setIsPassword(false)
    setEmailCode('')
    setPassword('')
    setConfirmPassword('')
  }

  function paymentOpenModal() {
    setIsPaymentOpen(true)
  }

  function requestUpdatePassword() {
    if (emailCode == '') {
      return setIsCode(true)
    }
    if (password != confirmPassword || password == '' || confirmPassword == '') {
      return setIsPassword(true)
    }
    setConfirmLoading(true)
    Http.getInstance()
      .requestUpdatePassword(emailCode, password)
      .then(response => {
        Log.d(response)
        paymentCloseModal()
        let newUser = {
          ...currentUser,
        }
        newUser.payment_password_set = 1
        dispatch(updateUserInfo(newUser))
        setIsCode(false)
        setIsPassword(false)
      })
      .catch(error => {
        Log.e(error)
        setIsCode(false)
        setIsPassword(false)
      })
      .finally(() => {
        setConfirmLoading(false)
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
        .requestOrderBuy(nftDetail.sell_id, value)
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
  }, [id])

  function loadData() {
    Http.getInstance()
      .getNFTInfo(parseInt(id))
      .then(response => {
        Log.d(response)
        setNFTDetail(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function cancelOrder() {
    Http.getInstance()
      .requestOrderCancel(nftDetail.sell_id)
      .then(response => {
        loadData()
        Log.d(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function requestOrderSell() {
    closeSellAssetModal()
    Http.getInstance()
      .requestOrderSell(id, sellPrice, sellExpiredTime, directionAddress)
      .then(response => {
        Log.d(response)
        loadData()
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function showMakeOffer() {
    setIsbalance(false)
    setIsOfferEndTime(false)
    setIsPassError(false)
    setOfferEndTime(0)
    setOfferPrice('0')
    if (currentUser) {
      if (currentUser.payment_password_set == 1) {
        setIsMakeOfferOpen(true)
        setIsOfferPasswordType(true)
      } else {
        setIsPaymentOpen(true)
      }
    } else {
      setIsLoginOpen(true)
    }
  }

  function showBuy() {
    setIsPassError(false)
    setIsbalance(false)
    setIsOfferEndTime(false)
    if (currentUser) {
      if (currentUser.payment_password_set == 1) {
        setIsOfferPasswordType(false)
        setIsBuyOpen(true)
      } else {
        setIsPaymentOpen(true)
      }
    } else {
      setIsLoginOpen(true)
    }
  }

  if (!nftDetail || !id) {
    return <LoadingCompontent />
  }

  function OwnerActionComponent() {
    // owner
    if (nftDetail.is_sell == AssetSellStatus.SELLING) {
      return (
        <div className="action w-full md:w-1/2">
          <button
            className="primary black"
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
        <div className="action w-full md:w-1/2">
          <button
            className="primary black"
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
    if (nftDetail.is_sell == AssetSellStatus.SELLING) {
      return (
        <div className="action">
          <button
            className="primary black md:mr-4"
            onClick={() => {
              showBuy()
            }}
          >
            <>{t('BUY')}</>
          </button>
          <button
            className="primary black outline"
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
        <div className="action w-full md:w-1/2">
          <button
            className="primary black"
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

  return (
    <div className="nft-detail">
      <div className="info">
        <div className="info-img">
          <img src={nftDetail.image} alt={nftDetail.name} />
        </div>
        <div className="detail">
          <h2>{nftDetail.name}</h2>
          {/** owner info */}
          <div className="owner">
            <Link href={`/collection/0/${nftDetail.collection.id}`}>
              <div className="tl cursor-pointer">
                <img src={nftDetail.collection.image} alt={nftDetail.user.name} />
                <p className="ml-1">{nftDetail.collection.name}</p>
              </div>
            </Link>
            <div className="tr">
              <p>{t('OWNED_BY')}</p>
              <Link href={`/user/${nftDetail.user.id}`}>
                <p className="name cursor-pointer">{nftDetail.user.name}</p>
              </Link>
            </div>
          </div>
          {/** count down */}
          <CountDownComponent endTime={nftDetail.sell_end_time} serverTime={nftDetail.server_time} />
          {/** price info */}
          <div className="price">
            <div>
              <p className="label">{t('HIGHEST_BID')}:</p>
              <p className="value">{nftDetail.highest_bid_price ? nftDetail.highest_bid_price : '--'} NEW</p>
            </div>
            <div>
              <p className="label">{t('PRICE')}:</p>
              <p className="value">{nftDetail.is_sell == 1 ? nftDetail.price : '--'} NEW</p>
            </div>
          </div>
          {/** action */}
          {currentUser && currentUser.id && currentUser.id == nftDetail.user.id
            ? OwnerActionComponent()
            : NormalActionComponent()}
        </div>
      </div>

      <div className="chain-info">
        <div className="detail">
          <h2>
            <>{t('Details')}</>
          </h2>
          <ChainInfoComponent
            address={nftDetail.chain_info.contract_address}
            tokenStandard={nftDetail.chain_info.token_standard}
            blockChain={nftDetail.chain_info.block_chain}
            creatorEariningPercent={nftDetail.creator_earnings_percent}
            tipCreatorEarningsPercent={nftDetail.creator_earnings_percent}
          />
          {nftDetail.properties.length > 0 && (
            <>
              <h2>
                <>{t('PROPERTIES')}</>
              </h2>
              <PropertiesComponents properties={nftDetail.properties} />
            </>
          )}
        </div>
        <div className="intro">
          <h2>
            <>{t('INTRODUCTION')}</>
          </h2>
          <div className="content">
            <p>{nftDetail.description}</p>
          </div>
        </div>
      </div>

      {/** buy dialog */}
      <DialogComponent isOpen={isBuyOpen} closeModal={closeBuyModal}>
        <BuyDialog nftDetail={nftDetail} showPassword={showPassword} />
      </DialogComponent>

      {/** make offer dialog */}
      <DialogComponent isOpen={isMakeOfferOpen} closeModal={closeMakeOfferModal}>
        <MakeOfferDialog
          nftDetail={nftDetail}
          showPassword={showPassword}
          offerEndTime={offerEndTime}
          setOfferEndTime={setOfferEndTime}
          offerPrice={offerPrice}
          setOfferPrice={setOfferPrice}
          isBalance={isBalance}
          isOfferEndTime={isOfferEndTime}
          setIsbalance={setIsbalance}
          setIsOfferEndTime={setIsOfferEndTime}
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
          nftDetail={nftDetail}
          showPassword={showPassword}
          setSellPrice={setSellPrice}
          setSellExpiredTime={setSellExpiredTime}
          requestOrderSell={requestOrderSell}
          setDirectionAddress={setDirectionAddress}
          tipCreatorEarningsPercent={nftDetail.creator_earnings_percent}
        />
      </DialogComponent>

      {/** login dialog */}
      <DialogComponent isOpen={isLoginOpen} closeModal={closeLoginModal}>
        <LoginDialog closeModal={closeLoginModal} />
      </DialogComponent>

      {/* payment dialog */}
      <DialogComponent isOpen={isPaymentOpen} closeModal={paymentCloseModal}>
        <PaymentPasswordDialog
          setEmailCode={setEmailCode}
          isCode={isCode}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          isPassord={isPassord}
          confirmLoading={confirmLoading}
          requestUpdatePassword={requestUpdatePassword}
        />
      </DialogComponent>
    </div>
  )
}
