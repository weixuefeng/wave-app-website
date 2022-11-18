/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 15:33:51
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 15:02:45
 * @FilePath: /wave-app-webiste/src/components/trade/TradeComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import { formatSeconds } from 'utils/time'

export default function BlindboxComponent(props) {
  const { item, openModal } = props

  return (
    <div className="blindbox">
      <div className='container'>

        <div className='blindbod-detail'>

          <div className='info-img'>
            <img src='https://newnet-cache.wavemall.io/thumb/QmcRjfyWxJXF6YXALWMtuoKvJX3RhzA3H1gbeWSJYh6r6C' alt='' />
          </div>

          <div className='info-detail'>
            <div className='count-down'>
              <div className='time'>Starts at 08.26 10:00(UTC+8)</div>
              <div className='drop'>
                <img src='/assets/image/icon_tips.png' alt='upcoming up' />
                Upcoming Drop
              </div>
            </div>
            <div className='title'>
              <h2>Remembering 1950</h2>
              <span>EVT</span>
            </div>
            <div className='number'>
              <p><span>Remaining</span>1000</p>
              <p className='ml-8'><span>Current Release</span>1000</p>
            </div>
            <div className='price'>100,000 NEW</div>
            <div className='action'>Subscribe</div>
          </div>

        </div>

        <div className='evt-detail'>

          <div className='detail-info'>

            <div className='info-specifications'>
              <h3>Specifications</h3>
              <ul>
                <li>
                  <span>Contract Address</span>
                  <span>NEW118...saQM</span>
                </li>
                <li>
                  <span>Token Standard</span>
                  <span>EVT (NRC-53)</span>
                </li>
                <li>
                  <span>Blockchain</span>
                  <span>Newton</span>
                </li>
                <li>
                  <span>Creator Earnings</span>
                  <span>5%</span>
                </li>
              </ul>
            </div>

            <div className='info-content'>
              <h3>Introduction</h3>
              <p>
                By accessing and placing an order with , you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and . Under no circumstances shall team be liable for any direct, indirect, special。.
              </p>
            </div>

            <div className='info-content info-evt'>
              <h3>What is EVT</h3>
              <p>
                EVT(Encrypted Variable Token) is a new kind of token type that we can use to replace NFT in metaverse and physical world
              </p>
            </div>

          </div>

          <div className='detail-description'>
            <div>
              <h3>Description</h3>
              <div className='description'>
                <div className='text'>
                中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国
                </div>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}