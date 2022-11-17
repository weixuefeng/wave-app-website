/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 11:33:34
 * @FilePath: /wave-app-website/src/components/asset/MyOffersMade.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import Nodata from 'components/layout/noData'
import { AssetMyOfferData } from 'model/asset'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useEffect, useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum, isInViewPort } from 'utils/functions'
import Log from 'utils/log'
import { formatDateTime } from 'utils/time'

export default function MyOffersMade(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [myMadeOffersData, setMyMadeOffersData] = useState<Array<AssetMyOfferData>>()
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
      getMadeOffer()
    }
  }, [currentUser])

  function getMadeOffer() {
    setIsLoading(true)
    Http.getInstance()
      .getOrderOffer(currentUser.id, currentPage, OfferType.MADE)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setMyMadeOffersData(response.data)
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
          setMyMadeOffersData(myMadeOffersData.concat(response.data))
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
        Log.e(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  if (myMadeOffersData?.length == 0) {
    return <Nodata />
  }

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          getMadeOffer()
        }
      }
    }
  }

  function dialogContent() {
    return (
      <div>
        <h2 className="text-base text-gray333">Are you sure you want to cancle the bid？</h2>
        <div className="mt-12 flex items-center justify-between">
          <div className="cursor-pointer rounded-xl border-2 border-gray333 px-11 py-4" onClick={closeModal}>
            Cancel
          </div>
          <div className="cursor-pointer rounded-xl bg-gray333 px-11 py-4 text-white">Confirm</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-offers">
      {/* <h2 className="offers-title">Offer Made</h2> */}
      <div className="offers-item">
        {myMadeOffersData?.map((item, index) => {
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
              <div className="cancel" onClick={openModal}>
                Cancel
              </div>
              <DialogComponent isOpen={isOpen} closeModal={closeModal}>
                {dialogContent()}
              </DialogComponent>
            </div>
          )
        })}
      </div>
      <button ref={ref} className="primary black mb-10" onClick={() => getMadeOffer()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </div>
  )
}
