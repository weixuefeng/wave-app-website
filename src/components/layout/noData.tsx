/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 20:26:17
 * @FilePath: /wave-app-webiste/src/components/home/BannerComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'

export default function Nodata(props) {
  return (
    <div className="container text-center">
      <img className="mx-auto mt-32 h-auto w-60" src="/assets/image/icon_no_data.png" alt="no data" />
      <h3 className="mt-11 mb-28 text-xl text-grayc7">There is no content here yet</h3>
    </div>
  )
}
