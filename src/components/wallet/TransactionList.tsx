import { WalletTransaction } from 'model/wallet'
import React, { useEffect, useRef, useState } from 'react'
import Http from 'services/http'
import { isInViewPort } from 'utils/functions'
import Log from 'utils/log'

export function TransactionComponent(props) {
  const { item } = props
  const info = item as WalletTransaction
  return (
    <div className="history-item">
      <h3>{info.trade_label}</h3>
      <div className="mt-4">
        <p className="label">Amount</p>
        <p>{info.amount} NEW</p>
      </div>
      <div>
        <p className="label">Wallet Balance</p>
        <p>{info.wallet_balance} NEW</p>
      </div>
      <div>
        <p className="label">Time</p>
        <p>{new Date(info.created_at * 1000).toLocaleString()}</p>
      </div>
    </div>
  )
}

export function TransactionList() {
  const [transaction, setTransaction] = useState<Array<WalletTransaction>>()
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setIsLoading(true)
    Http.getInstance()
      .getWalletTransaction(currentPage, 1)
      .then(response => {
        if (currentPage == 1) {
          // first page
          setTransaction(response.data)
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
          setTransaction(transaction.concat(response.data))
          // check has more
          if (response.page_id < response.total_page) {
            setHasMore(true)
            setCurrentPage(currentPage + 1)
          } else {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        Log.e(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

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

  return (
    <div className="list">
      <ul>
        {transaction?.map((item, index) => {
          return <TransactionComponent key={index} item={item} />
        })}
      </ul>
      <button ref={ref} className="primary black" onClick={() => fetchData()}>
        {isLoading ? 'loading...' : hasMore ? 'load more' : 'no more'}
      </button>
    </div>
  )
}
