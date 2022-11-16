/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:35:19
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-16 20:14:55
 * @FilePath: /wave-app-webiste/src/pages/notification.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NormalLayout from 'components/layout/normalLayout'
import { PageModel } from 'model/navModel'
import React, { useEffect, useState } from 'react'
import Http from 'services/http'
import Log from 'utils/log'

export default function Notification() {
  let pageModel = new PageModel('Notification', 'WAVE', '')

  useEffect(() => {
    // fetchData()
  }, [])

  function fetchData() {
    Http.getInstance()
      .getNotificationList(1)
      .then(response => {
        console.log('response', response)
        // setTicketData(response.data)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  function content() {
    return (
      <div className="notification">
        <div className="container">
          <ul className="notification-itme">
            <li className="item">
              <div className="date">July 4, 2022</div>
              <div className="content">
                <h2>Notice of auction results</h2>
                <p>
                  By accessing and placing an order with , you confirm that you are in agreement with and bound by the
                  terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire
                  website and any email or other type of communication between you and . Under no circumstances shall
                  team be liable for any direct, indirect, special, incidental or consequential damages, including, but
                  not limited to, loss of data or profit, arising out of the use。.
                </p>
              </div>
            </li>
            <li className="item">
              <div className="date">July 4, 2022</div>
              <div className="content">
                <h2>Notice of auction results</h2>
                <p>
                  By accessing and placing an order with , you confirm that you are in agreement with and bound by the
                  terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire
                  website and any email or other type of communication between you and . Under no circumstances shall
                  team be liable for any direct, indirect, special, incidental or consequential damages, including, but
                  not limited to, loss of data or profit, arising out of the use。.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
