/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:44:56
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 15:09:49
 * @FilePath: /wave-app-webiste/src/components/asset/MyOffers.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'

export default function Myoffers(props) {
  return (
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
          <div className="acce">Acce</div>
          <div className="see-more">see more</div>
        </div>
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
          <div className="acce">Acce</div>
          <div className="see-more">see more</div>
        </div>
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
          <div className="acce">Acce</div>
          <div className="see-more">see more</div>
        </div>
      </div>

      <h2 className="offers-title">Offer Made</h2>

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
          <div className="cancel">Cancel</div>
        </div>
      </div>
    </div>
  )
}
