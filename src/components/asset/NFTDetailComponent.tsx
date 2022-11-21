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
import { useAppSelector } from 'store/store'
import { selectUser } from 'reducer/userReducer'
import SellAssetDialog from 'components/dialog/SellAssetDialog'
import Log from 'utils/log'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import LoginDialog from 'components/dialog/LoginDialog'
import Link from 'next/link'
import { t } from 'i18next'

export default function NFTDetailComponent(props) {
  const { id } = props
  const currentUser = useAppSelector(selectUser)

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

  // login dialog
  const [isLoginOpen, setIsLoginOpen] = useState(false)

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

  function showPassword() {
    closeMakeOfferModal()
    closeBuyModal()
    closeSellAssetModal()
    setIsPasswordOpen(true)
  }

  function onConfirmPassword(value) {
    closePasswordModal()
    if (isOfferPasswordType) {
      // make offer
      Http.getInstance()
        .requestOrderBid(id, offerPrice, value, offerEndTime)
        .then(response => {
          // refresh page
          loadData()
        })
        .catch(error => {
          Log.e(error)
        })
    } else {
      // buy
      Http.getInstance()
        .requestOrderBuy(nftDetail.sell_id, value)
        .then(response => {
          // refresh page
          loadData()
        })
        .catch(error => {
          Log.e(error)
        })
    }
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
      .requestOrderSell(nftDetail.id, sellPrice, sellExpiredTime, directionAddress)
      .then(response => {
        Log.d(response)
        loadData()
      })
      .catch(error => {
        Log.e(error)
      })
  }

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

  if (!nftDetail || !id) {
    return <>loading...</>
  }

  function OwnerActionComponent() {
    // owner
    if (nftDetail.is_sell == AssetSellStatus.SELLING) {
      return (
        <div className="action">
          <button
            className="primary ml-4 outline"
            onClick={() => {
              cancelOrder()
            }}
          >
            取消出售{' '}
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
            出售{' '}
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
            className="primary black"
            onClick={() => {
              showBuy()
            }}
          >
            <>{t('BUY')}</>
          </button>
          <button
            className="primary black ml-4 outline"
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
            className="primary ml-4 outline"
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
        <img src={nftDetail.image} alt={nftDetail.name} />
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
              <p>Owned by</p>
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
              <p className="label">Hightest Bid:</p>
              <p className="value">{nftDetail.highest_bid_price ? nftDetail.highest_bid_price : '--'} NEW</p>
            </div>
            <div>
              <p className="label">Price:</p>
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
          setOfferEndTime={setOfferEndTime}
          setOfferPrice={setOfferPrice}
        />
      </DialogComponent>

      {/** password dialog */}
      <DialogComponent isOpen={isPasswordOpen} closeModal={closePasswordModal}>
        <PasswordDialog onCancel={() => closePasswordModal()} onConfirm={onConfirmPassword} />
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
        />
      </DialogComponent>

      {/** login dialog */}
      <DialogComponent isOpen={isLoginOpen} closeModal={closeLoginModal}>
        <LoginDialog closeModal={closeLoginModal} />
      </DialogComponent>
    </div>
  )
}
