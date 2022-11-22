import { WalletTransaction } from 'model/wallet'
import React, { useRef } from 'react'
import Http from 'services/http'
import Nodata from 'components/layout/NoData'
import usePagination from 'hooks/usePagination'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'

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


  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error } = usePagination<WalletTransaction>(ref, fetchData)

  function fetchData() {
    return Http.getInstance().getWalletTransaction(currentPage, 0)
  }

  if (!data?.length) {
    return <Nodata />
  }

  return (
    <div className="list">
      <ul>
        {data?.map((item, index) => {
          return <TransactionComponent key={index} item={item} />
        })}
      </ul>
      <div ref={ref}>
        <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}
