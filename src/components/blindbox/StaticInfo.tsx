/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-14 13:36:09
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-18 19:59:54
 * @FilePath: /wave-app-webiste/src/components/blindbox/StaticInfo.tsx
 */

import React from 'react'
import Link from 'next/link'

export default StaticInfo

function StaticInfo(props) {
  return (
    <>
      <div className="info-content">
        <h3>Introduction</h3>
        <p>
          By accessing and placing an order with , you confirm that you are in agreement with and bound by the terms of
          service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any
          email or other type of communication between you and . Under no circumstances shall team be liable for any
          direct, indirect, special.
        </p>
      </div>

      <div className="info-content info-evt">
        <h3>What is EVT</h3>
        <p>
          EVT(Encrypted Variable Token) is a new kind of token type that we can use to replace NFT in metaverse and
          physical world
          <Link href="https://www.newtonproject.org/en/evt/">
            <a target="_blank">...More</a>
          </Link>
        </p>
      </div>
    </>
  )
}
