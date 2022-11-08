/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 20:49:04
 * @FilePath: /wave-app-webiste/src/components/asset/MyOffers.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DialogComponent from 'components/common/DialogComponent'
import MyoffersAcceDialog from 'components/dialog/MyoffersAcceDialog'
import React, { useState } from 'react'
import { floorNum } from 'utils/functions'
import { formatDateTime } from 'utils/time'

export default function Myoffers(props) {
  const { myOffersData } = props
  console.log('myOffersData', myOffersData)
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function dialogContent() {
    return (
      <div id="assets-more-modal">
        <h3 className="text-2xl font-normal text-gray333">Wonder Woman Woman #23</h3>
        <h4 className="mb-5 mt-4 text-lg font-normal text-gray333">More offers</h4>

        <div className="mb-6 rounded-lg bg-grayf8 px-3">
          <div className="flex items-center justify-between py-3">
            <span>From</span>
            <span className="right">Yonghunicheng</span>
          </div>
          <div className="border-grayf0 flex items-center justify-between border-y-[1px]  py-3">
            <span>Price</span>
            <span className="right">250,000,000 NEW</span>
          </div>
          <div className="flex items-center justify-between  py-3">
            <span>Expire date</span>
            <span className="right">2022-05-23 23:33</span>
          </div>
          <div className="pb-4 text-center text-lg text-green57">Accept</div>
        </div>

        <div className="rounded-lg bg-grayf8 px-3">
          <div className="flex items-center justify-between py-3">
            <span>From</span>
            <span className="right">Yonghunicheng</span>
          </div>
          <div className="border-grayf0 flex items-center justify-between border-y-[1px]  py-3">
            <span>Price</span>
            <span className="right">250,000,000 NEW</span>
          </div>
          <div className="flex items-center justify-between  py-3">
            <span>Expire date</span>
            <span className="right">2022-05-23 23:33</span>
          </div>
          <div className="pb-4 text-center text-lg text-green57">Accept</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="my-offers">
        <h2 className="offers-title">Offer Received</h2>

        <div className="offers-item">
          <div className="item">
            <div className="received-img">
              <div className="img-box">
                <img
                  src="https://newnet-cache.wavemall.io/thumb/QmYXP2R9bNkNEAZGe6Ne6vy42aQzvLTQ4P5a7oeyjPotYj"
                  alt="img"
                />
              </div>
              <div className="name">
                <h3>Wonder Woman Woman #23</h3>
                <p>Wonder Woman Woman</p>
              </div>
            </div>
            <ul className="price">
              <li>
                <span>From</span>
                <span className="right">Yonghunicheng</span>
              </li>
              <li>
                <span>Price</span>
                <span className="right">250,000,000 NEW</span>
              </li>
              <li>
                <span>Expire date</span>
                <span className="right">2022-05-23 23:33</span>
              </li>
            </ul>
            <MyoffersAcceDialog />
            <div className="see-more" onClick={openModal}>
              see more
            </div>
          </div>
        </div>

        <h2 className="offers-title">Offer Made</h2>
        <div className="offers-item">
          {myOffersData?.map((item, index) => {
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
                <div className="cancel">Cancel</div>
              </div>
            )
          })}
        </div>
      </div>

      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        {dialogContent()}
      </DialogComponent>
    </>
  )
}
