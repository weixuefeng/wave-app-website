/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:26:10
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-04 14:47:54
 * @FilePath: /wave-app-webiste/src/components/footer/footer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import { Skeleton } from 'antd'

export default function Loading() {
  let arrLoading = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="loading container mx-auto">
      {arrLoading.map((item, index) => {
        return (
          <div className="item" key={index}>
            <Skeleton.Image active />
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        )
      })}
    </div>
  )
}
