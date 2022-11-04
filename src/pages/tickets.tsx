/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-03 20:26:47
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-04 17:33:47
 * @FilePath: /wave-app-webiste/src/pages/tickets.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import React, { useState, useEffect } from 'react'
import Http from 'services/http'

export default function Tickets() {

  let pageModel = new PageModel('Tickets', 'WAVE', '')

  useEffect(() => {
    fetchData();
  },[])

  function fetchData() {
    Http.getInstance()
    .getEvtTickets(1)
    .then(response => {
      console.log('response',response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function content() {
    return (
      <div className='tickets'>
        <div className='container mx-auto'>
          <h2 className='title'>Tickets</h2>
          <div className='tickets-item'>

            <div className='item'>
              <div className='img'>
                <img src='/assets/image/tickets_bg.png' alt='tickets background' />
              </div>
              <div className='info'>
                <h2>The Wandering Earth</h2>
                <div className='content'>
                  <div className='content-img'>
                    <div className='img-box'>
                      <img src='https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn' alt='tickets background' />
                    </div>
                  </div>
                  <div className='time'>
                    <h3>Purchase time</h3>
                    <p>2022.02.03 12:50</p>
                    <h3 className='time-check'>Check in deadline</h3>
                    <p>2022.02.03 12:50</p>
                  </div>
                </div>
              </div>
              <div>
                <img src='/assets/image/tickets_not_checked.png' alt='tickets not checked' />
              </div>
            </div>

            <div className='item'>
              <div className='img'>
                <img src='/assets/image/tickets_bg.png' alt='tickets background' />
              </div>
              <div className='info'>
                <h2>The Wandering Earth</h2>
                <div className='content'>
                  <div className='content-img'>
                    <div className='img-box'>
                      <img src='https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn' alt='tickets background' />
                    </div>
                  </div>
                  <div className='time'>
                    <h3>Purchase time</h3>
                    <p>2022.02.03 12:50</p>
                    <h3 className='time-check'>Check in deadline</h3>
                    <p>2022.02.03 12:50</p>
                  </div>
                </div>
              </div>
              <div>
                <img src='/assets/image/tickets_checked.png' alt='tickets not checked' />
              </div>
            </div>

            <div className='item'>
              <div className='img'>
                <img src='/assets/image/tickets_bg.png' alt='tickets background' />
              </div>
              <div className='info'>
                <h2>The Wandering Earth</h2>
                <div className='content'>
                  <div className='content-img'>
                    <div className='img-box'>
                      <img src='https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn' alt='tickets background' />
                    </div>
                  </div>
                  <div className='time'>
                    <h3>Purchase time</h3>
                    <p>2022.02.03 12:50</p>
                    <h3 className='time-check'>Check in deadline</h3>
                    <p>2022.02.03 12:50</p>
                  </div>
                </div>
              </div>
              <div>
                <img src='/assets/image/tickets_expired.png' alt='tickets not checked' />
              </div>
            </div>

            <div className='item'>
              <div className='img'>
                <img src='/assets/image/tickets_bg.png' alt='tickets background' />
              </div>
              <div className='info'>
                <h2>The Wandering Earth</h2>
                <div className='content'>
                  <div className='content-img'>
                    <div className='img-box'>
                      <img src='https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn' alt='tickets background' />
                    </div>
                  </div>
                  <div className='time'>
                    <h3>Purchase time</h3>
                    <p>2022.02.03 12:50</p>
                    <h3 className='time-check'>Check in deadline</h3>
                    <p>2022.02.03 12:50</p>
                  </div>
                </div>
              </div>
              <div>
                <img src='/assets/image/tickets_not_checked.png' alt='tickets not checked' />
              </div>
            </div>

            <div className='item'>
              <div className='img'>
                <img src='/assets/image/tickets_bg.png' alt='tickets background' />
              </div>
              <div className='info'>
                <h2>The Wandering Earth</h2>
                <div className='content'>
                  <div className='content-img'>
                    <div className='img-box'>
                      <img src='https://newnet-cache.wavemall.io/thumb/QmdERjCYsXXgSBq3tX9we4G5VeXX3Kzd671u6qzi7ehWwn' alt='tickets background' />
                    </div>
                  </div>
                  <div className='time'>
                    <h3>Purchase time</h3>
                    <p>2022.02.03 12:50</p>
                    <h3 className='time-check'>Check in deadline</h3>
                    <p>2022.02.03 12:50</p>
                  </div>
                </div>
              </div>
              <div>
                <img src='/assets/image/tickets_not_checked.png' alt='tickets not checked' />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
