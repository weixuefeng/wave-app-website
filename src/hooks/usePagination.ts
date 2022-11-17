import { Pagination } from 'model/base'
import React, { useEffect, useState } from 'react'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'

type LoadPaginationData<M> = () => Promise<Pagination<M>>

export default function usePagination<T>(ref: React.MutableRefObject<any>, loadPaginationData: LoadPaginationData<T>) {
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<Array<T>>()
  const [error, setError] = useState(null)

  const handleScroll = () => {
    if (ref) {
      let res = isInViewPort(ref.current)
      if (res) {
        if (hasMore && !isLoading) {
          loadData()
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setIsLoading(true)
      var response = await loadPaginationData()
      if (currentPage == 1) {
        // first page data
        setData(response.data)
        // check has more
        if (response.page_id < response.total_page) {
          setHasMore(true)
          // update current page
          setCurrentPage(currentPage + 1)
        } else {
          setHasMore(false)
        }
      } else {
        // more page
        setData(data.concat(response.data))
        // check has more
        if (response.page_id < response.total_page) {
          setHasMore(true)
          setCurrentPage(currentPage + 1)
        } else {
          setHasMore(false)
        }
      }
      setIsLoading(false)
    } catch (e) {
      Log.e(e)
      setError(e.toString())
    }
  }

  return { hasMore, isLoading, currentPage, data, error }
}
