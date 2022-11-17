/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-17 15:35:04
 * @FilePath: /wave-app-webiste/src/components/home/BannerComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useRef, useState } from 'react'

export default function LoadMore(props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  if (currentPage == 1) {
    return (
      <>
        {isLoading ? (
          <div ref={ref} className="mt-10 text-center text-base text-gray99">
            <img className="mx-auto mt-10 h-auto w-44" src="/assets/image/loading.gif" alt="loading" />
          </div>
        ) : null}
      </>
    )
  } else {
    return (
      <>
        {
          <div ref={ref} className="mt-10 text-center text-base text-gray99">
            {hasMore ? '加载中...' : '没有更多了'}
          </div>
        }
      </>
    )
  }
}
