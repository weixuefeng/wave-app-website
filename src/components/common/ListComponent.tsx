import React, { useEffect, useRef, useState } from 'react'
import { isInViewPort } from 'utils/functions'

export default function ListComponent(props) {
  const { data, children, fetchData } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const ref = useRef(null)

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          fetchData()
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <div className="list">
      {children}
      <button ref={ref} className="primary black" onClick={() => fetchData()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </div>
  )
}
