/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-17 18:32:09
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-28 13:44:26
 * @FilePath: /wave-app-website/src/hooks/usePagination.ts
 */
import { Pagination } from 'model/base'
import { UserInfo } from 'model/user'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import { useAppSelector } from 'store/store'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'

type LoadPaginationData<M> = () => Promise<Pagination<M>>

export default function usePagination<T>(ref: React.MutableRefObject<any>, loadPaginationData: LoadPaginationData<T>) {
  const currentUser = useAppSelector(selectUser) as UserInfo
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
          loadData(currentPage)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    loadData(currentPage)
  }, [currentUser])

  async function loadData(page) {
    try {
      setIsLoading(true)
      var response = await loadPaginationData()
      if (page == 1) {
        // first page data
        if (response.data && response.data.length > 0) {
          Log.d('set first page data')
          setData(response.data)
        } else {
          Log.d('set empty data')
          setData([])
        }
        // check has more
        if (response.page_id < response.total_page) {
          setHasMore(true)
          // update current page
          setCurrentPage(page + 1)
        } else {
          setHasMore(false)
        }
      } else {
        // more page
        setData(data.concat(response.data))
        // check has more
        if (response.page_id < response.total_page) {
          setHasMore(true)
          setCurrentPage(page + 1)
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

  async function refreshData() {
    setCurrentPage(1)
    loadData(1)
  }

  return { hasMore, isLoading, currentPage, data, error, setCurrentPage, refreshData }
}
