/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:43:46
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 11:51:13
 * @FilePath: /wave-app-webiste/src/components/asset/MyListings.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Mylistings(props) {
  return (
    <div className="my-listings">
      <div className="item">
        <Link href={''}>
          <a href="" className="cover">
            <div className="perfect-square">
              <img
                src={'https://newnet-cache.wavemall.io/thumb/QmYXP2R9bNkNEAZGe6Ne6vy42aQzvLTQ4P5a7oeyjPotYj'}
                alt={''}
              />
              <span className="type">evt</span>
            </div>
            <div className="name">
              <h3>Remembering 1950 #23</h3>
              <p className="list-price">
                <span>List Price</span>
                <span>Floor Difference</span>
              </p>
              <p className="price">
                <span>100000 NEW</span>
                <span>2022-03-23 12:23</span>
              </p>
              <div className="cancel">Cancel</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
