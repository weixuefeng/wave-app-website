/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-18 15:55:00
 * @FilePath: /wave-app-website/src/components/blindbox/BlindboxComponent.tsx
 */

import ChainInfoComponent from 'components/asset/ChainInfoComponent'
import React from 'react'

export default function BlindboxComponent(props) {
  const { item, openModal } = props

  return (
    <div className="blindbox">
      <div className="container">
        <div className="blindbod-detail">
          <div className="info-img">
            <img src="https://newnet-cache.wavemall.io/thumb/QmcRjfyWxJXF6YXALWMtuoKvJX3RhzA3H1gbeWSJYh6r6C" alt="" />
          </div>

          <div className="info-detail">
            <div className="count-down">
              <div className="time">Starts at 08.26 10:00(UTC+8)</div>
              <div className="drop">
                <img src="/assets/image/icon_tips.png" alt="upcoming up" />
                Upcoming Drop
              </div>
            </div>
            <div className="title">
              <h2>Remembering 1950</h2>
              <span>EVT</span>
            </div>
            <div className="number">
              <p>
                <span>Remaining</span>1000
              </p>
              <p className="ml-8">
                <span>Current Release</span>1000
              </p>
            </div>
            <div className="price">100,000 NEW</div>
            <div className="action">Subscribe</div>
          </div>
        </div>

        <div className="evt-detail">
          <div className="detail-info">
            <div className="info-specifications">
              <h3>Specifications</h3>
              <ChainInfoComponent />
            </div>

            <div className="info-content">
              <h3>Introduction</h3>
              <p>
                By accessing and placing an order with , you confirm that you are in agreement with and bound by the
                terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire
                website and any email or other type of communication between you and . Under no circumstances shall team
                be liable for any direct, indirect, special。.
              </p>
            </div>

            <div className="info-content info-evt">
              <h3>What is EVT</h3>
              <p>
                EVT(Encrypted Variable Token) is a new kind of token type that we can use to replace NFT in metaverse
                and physical world
              </p>
            </div>
          </div>

          <div className="detail-description">
            <div>
              <h3>Description</h3>
              <div className="description">
                <div className="text">中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
