import React from 'react'

export default function LoadMoreComponent(props) {
  const { ref, isLoading, hasMore, fetchData } = props
  return (
    <button ref={ref} className="primary black" onClick={() => fetchData()}>
      {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
    </button>
  )
}
