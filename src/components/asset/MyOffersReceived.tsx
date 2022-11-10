/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 20:15:28
 * @FilePath: /wave-app-webiste/src/components/asset/MyOffers.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import MyoffersAcceDialog from 'components/dialog/MyoffersAcceDialog'
import { AssetMyOfferData } from 'model/asset'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum, isInViewPort } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export default function MyOffersReceived(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myReceiveOffersData, setMyReceiveOffersData] = useState<Array<AssetMyOfferData>>()
  let [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (currentUser) {
      getReceivedOffer()
    }
  }, [currentUser])

  function getReceivedOffer() {
    setIsLoading(true)
    Http.getInstance()
      .getOrderOffer(currentUser.id, currentPage, OfferType.RECEIVED)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setMyReceiveOffersData(response.data)
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            // update current page
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        } else {
          // more page
          setMyReceiveOffersData(myReceiveOffersData.concat(response.data))
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          getReceivedOffer()
        }
      }
    }
  }

  return (
    <div className="my-offers">
      {/* <h2 className="offers-title">Offer Received</h2> */}
      <div className="offers-item">
        {myReceiveOffersData?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="received-img">
                <div className="img-box">
                  <img src={item.nft.image} alt={item.nft.name} />
                </div>
                <div className="name">
                  <h3>{item.nft.name}</h3>
                  <p>{item.collection.name}</p>
                </div>
              </div>
              <ul className="price">
                <li>
                  <span>From</span>
                  <span className="right">{item.from.name}</span>
                </li>
                <li>
                  <span>Price</span>
                  <span className="right">{floorNum(item.price)} NEW</span>
                </li>
                <li>
                  <span>Expire date</span>
                  <span className="right">{formatDateTime(item.expire_time)}</span>
                </li>
              </ul>
              <MyoffersAcceDialog />
              <div className="see-more" onClick={openModal}>
                see more
              </div>
              <DialogComponent isOpen={isOpen} closeModal={closeModal}>
                {dialogContent(item.from.name, item.price, item.expire_time)}
              </DialogComponent>
            </div>
          )
        })}
      </div>
      <button ref={ref} className="primary black mb-10" onClick={() => getReceivedOffer()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </div>
  )
}

function dialogContent(fromName, price, time) {
  return (
    <div className="dialog-offers-received">
      <h3>Wonder Woman Woman #23</h3>
      <h4>More offers</h4>
      <div className="from-box">
        <div className="from">
          <span>From</span>
          <span className="right">{fromName}</span>
        </div>
        <div className="price">
          <span>Price</span>
          <span className="right">{floorNum(price)} NEW</span>
        </div>
        <div className="expire">
          <span>Expire date</span>
          <span className="right">{formatDateTime(time)}</span>
        </div>
        <div className="accept">Accept</div>
      </div>
    </div>
  )
}
