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

export default function NFTDetailComponent(props) {
  const { id } = props

  const [nftDetail, setNFTDetail] = useState<NFTDetail>(null)
  const [isBuyOpen, setIsBuyOpen] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false)
  const [offerEndTime, setOfferEndTime] = useState(0)
  const [offerPrice, setOfferPrice] = useState('0')
  const [isOfferPasswordType, setIsOfferPasswordType] = useState(true)

  const currentUser = useAppSelector(selectUser)

  function closeBuyModal() {
    setIsBuyOpen(false)
  }

  function closePasswordModal() {
    setIsPasswordOpen(false)
  }

  function closeMakeOfferModal() {
    setIsMakeOfferOpen(false)
  }

  function showPassword() {
    closeMakeOfferModal()
    closeBuyModal()
    setIsPasswordOpen(true)
  }

  function onConfirmPassword(value) {
    closePasswordModal()
    if(isOfferPasswordType) {
      // make offer
      Http.getInstance()
        .requestOrderBid(id, offerPrice, value, offerEndTime)
        .then(response => {
          // refresh page
          loadData()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // buy
      Http.getInstance()
        .requestOrderBuy(nftDetail.sell_id, value)
        .then(response => {
          // refresh page
          loadData()
        })
        .catch(err => {
          console.log(err)
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
        console.log(response)
        setNFTDetail(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function cancelOrder() {
    Http.getInstance().requestOrderCancel(nftDetail.sell_id)
    .then(response => {
      loadData()
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
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
              setIsMakeOfferOpen(true)
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
              setIsOfferPasswordType(false)
              setIsBuyOpen(true)
            }}
          >
            Buy
          </button>
          <button
            className="primary black ml-4 outline"
            onClick={() => {
              setIsMakeOfferOpen(true)
              setIsOfferPasswordType(true)
            }}
          >
            Make Offer{' '}
          </button>
        </div>
      )
    } else {
      return (
        <div className="action">
          <button
            className="primary ml-4 outline"
            onClick={() => {
              setIsMakeOfferOpen(true)
            }}
          >
            Make Offer{' '}
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
            <div className="tl">
              <img src={nftDetail.collection.image} alt={nftDetail.user.name} />
              <p className="ml-1">{nftDetail.collection.name}</p>
            </div>
            <div className="tr">
              <p>Owned by</p>
              <p className="name">{nftDetail.user.name}</p>
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
          <h2>Details</h2>
          <ChainInfoComponent
            address={nftDetail.chain_info.contract_address}
            tokenStandard={nftDetail.chain_info.token_standard}
            blockChain={nftDetail.chain_info.block_chain}
            creatorEariningPercent={nftDetail.creator_earnings_percent}
          />
          {nftDetail.properties.length > 0 && (
            <>
              <h2>Properties</h2>
              <PropertiesComponents properties={nftDetail.properties} />
            </>
          )}
        </div>
        <div className="intro">
          <h2>Introduction</h2>
          <div className="content">
            <p>{nftDetail.description}</p>
          </div>
        </div>
      </div>

      {/** buy dialog */}
      <DialogComponent isOpen={isBuyOpen} closeModal={closeBuyModal}>
        <BuyDialog nftDetail={nftDetail} showPassword={showPassword}/>
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
    </div>
  )
}
