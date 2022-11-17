import React from 'react'
import Nodata from './noData'

export default function LoadMoreComponent(props) {
  const { currentPage, isLoading, hasMore, data } = props

  if (currentPage == 1) {
    return (
      <>
        {isLoading ? (
          <div className="mt-10 text-center text-base text-gray99">
            <img className="mx-auto mt-10 h-auto w-44" src="/assets/image/loading.gif" alt="loading" />
          </div>
        ) : data.length > 0 ? null : <Nodata/>}
      </>
    )
  } else {
    return <>{<div className="mt-10 text-center text-base text-gray99">{hasMore ? '加载中...' : '没有更多了'}</div>}</>
  }
}
