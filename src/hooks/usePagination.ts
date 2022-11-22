/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-17 18:32:09
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-22 15:49:05
 * @FilePath: /wave-app-website/src/hooks/usePagination.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
  }, [currentUser])

  async function loadData() {
    try {
      setIsLoading(true)
      var response = await loadPaginationData()
      if (currentPage == 1) {
        // first page data
        console.log("set data");
        
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

  return { hasMore, isLoading, currentPage, data, error, setCurrentPage }
}
