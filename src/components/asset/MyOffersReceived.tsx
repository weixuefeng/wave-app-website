/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 20:57:01
 * @FilePath: /wave-app-website/src/components/asset/MyOffersReceived.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import MyoffersAcceDialog from 'components/dialog/MyoffersAcceDialog'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import usePagination from 'hooks/usePagination'
import { AssetMyOfferData } from 'model/asset'
import { OfferType } from 'model/offer'
import { UserInfo } from 'model/user'
import React, { useRef, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import { floorNum } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export default function MyOffersReceived(props) {
  const currentUser = useAppSelector(selectUser) as UserInfo
  let [isOpen, setIsOpen] = useState(false)

  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<AssetMyOfferData>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getOrderOffer(currentUser.id, currentPage, OfferType.RECEIVED)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="my-offers">
      <div className="offers-item">
        {data?.map((item, index) => {
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
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
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
