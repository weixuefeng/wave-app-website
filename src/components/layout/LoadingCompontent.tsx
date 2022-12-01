/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 00:10:59
 * @FilePath: /wave-app-webiste/src/components/layout/LoadingCompontent.tsx
 */

import React from 'react'

export default function LoadingCompontent(props) {
  return (
    <div className="h-screen w-full pb-10">
      <img className="mx-auto h-auto w-44 pt-32" src="/assets/image/loading.gif" alt="loading img" />
    </div>
  )
}
