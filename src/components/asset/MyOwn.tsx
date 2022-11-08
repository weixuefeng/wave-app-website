/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-04 20:42:02
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 19:28:50
 * @FilePath: /wave-app-webiste/src/components/asset/MyOwn.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { getAssetNameByType } from 'model/asset'
import Link from 'next/link'
import React from 'react'

export default function Myown(props) {

  const { myOwnData } = props

  return (
    <div className="my-own">
      {
        myOwnData?.map((item, index) => {
          return (
            <div className="item" key={index}>
              <Link href={''}>
                <a href="" className="cover">
                  <div className="perfect-square">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                    <span className={getAssetNameByType(item.type) == 'nft' ? 'type' : ''}>
                      {getAssetNameByType(item.type)}
                    </span>
                  </div>
                  <div className="own-name">{item.name}</div>
                </a>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}
