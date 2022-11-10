/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-10 13:51:25
 * @FilePath: /wave-app-website/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import React, { useState, useEffect } from 'react'

export default function Cinema() {
  let pageModel = new PageModel('Cinema', 'WAVE', '')

  function content() {
    return (
      <div className="cinema-page">
        <div className="container mx-auto">
          <h2 className="title">My Cinema</h2>
          <div className="cinema">
            <div className="item">
              <div className="img">
                <img
                  src="https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn"
                  alt="img"
                />
              </div>
              <div className="type">EVT</div>
              <div className="info-bg">
                <div className="info">
                  <div className="name">
                    <h5>Wonder Woman</h5>
                    <p>1:50:55</p>
                  </div>
                  <div className="pic">
                    <img src="/assets/image/icon_play.png" alt="play icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="img">
                <img
                  src="https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn"
                  alt="img"
                />
              </div>
              <div className="type">EVT</div>
              <div className="info-bg">
                <div className="info">
                  <div className="name">
                    <h5>Wonder Woman</h5>
                    <p>1:50:55</p>
                  </div>
                  <div className="pic">
                    <img src="/assets/image/icon_play.png" alt="play icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="img">
                <img
                  src="https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn"
                  alt="img"
                />
              </div>
              <div className="type">EVT</div>
              <div className="info-bg">
                <div className="info">
                  <div className="name">
                    <h5>Wonder Woman</h5>
                    <p>1:50:55</p>
                  </div>
                  <div className="pic">
                    <img src="/assets/image/icon_play.png" alt="play icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
