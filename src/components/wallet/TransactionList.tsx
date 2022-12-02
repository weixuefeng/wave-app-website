/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-22 17:13:45
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:01:38
 * @FilePath: /wave-app-website/src/components/wallet/TransactionList.tsx
 */
import { WalletTransaction } from 'model/wallet'
import React, { useRef } from 'react'
import Http from 'services/http'
import EmptyComponent from 'components/layout/EmptyComponent'
import usePagination from 'hooks/usePagination'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import { useTranslation } from 'react-i18next'
import Log from 'utils/log'

export function TransactionComponent(props) {
  const { t } = useTranslation()
  const { item } = props
  const info = item as WalletTransaction

  function walletPrice(price) {
    let numPrice = price.charAt(0)
    if (numPrice == '-') {
      return <p className="buy">{price} NEW</p>
    } else {
      return <p className="income">{price} NEW</p>
    }
  }

  return (
    <div className="history-item">
      <h3>{item.trade_label}</h3>
      <div className="mt-4">
        <p className="label">
          <>{t('AMOUNT')}</>
        </p>
        {walletPrice(info.total)}
      </div>
      <div>
        <p className="label">
          <>{t('WALLET_BALANCE')}</>
        </p>
        <p>{info.wallet_balance} NEW</p>
      </div>
      <div>
        <p className="label">
          <>{t('TIME')}</>
        </p>
        <p>{new Date(info.created_at * 1000).toLocaleString()}</p>
      </div>
    </div>
  )
}

// export function TransactionList() {
//   const ref = useRef(null)

//   const { hasMore, isLoading, currentPage, data, error } = usePagination<WalletTransaction>(ref, fetchData)

//   function fetchData() {
//     return Http.getInstance().getWalletTransaction(currentPage, 0)
//   }

//   if (!data?.length) {
//     return <EmptyComponent />
//   }

//   return (
//     <div className="list">
//       <ul>
//         {data?.map((item, index) => {
//           return <TransactionComponent key={index} item={item} />
//         })}
//       </ul>
//       <div ref={ref}>
//         <LoadMoreComponent currentPage={currentPage} hasMore={hasMore} isLoading={isLoading} data={data} />
//       </div>
//     </div>
//   )
// }
