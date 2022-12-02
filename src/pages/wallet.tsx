/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-02 12:24:32
 * @FilePath: /wave-app-website/src/pages/wallet.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import WalletHistoryDialog from 'components/dialog/WalletHistoryDialog'
import WalletReminderDialog from 'components/dialog/WalletReminderDialog'
import EmptyComponent from 'components/layout/EmptyComponent'
import LoadingCompontent from 'components/layout/LoadingCompontent'
import LoadMoreComponent from 'components/layout/LoadMoreComponent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import { TransactionComponent } from 'components/wallet/TransactionList'
import usePagination from 'hooks/usePagination'
import { PageModel } from 'model/navModel'
import { WalletInfo, WalletTransaction } from 'model/wallet'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function Wallet(props) {
  let pageModel = new PageModel('Wallet', 'WAVE', '')
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser)
  const [walletInfo, setWalletInfo] = useState<WalletInfo>()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenHistory, setIsOpenHistory] = useState(false)
  const [filterVal, setFilterVal] = useState(0)

  const ref = useRef(null)

  const { hasMore, isLoading, currentPage, data, error, refreshData } = usePagination<WalletTransaction>(ref, fetchData)

  useEffect(() => {
    if (!currentUser) {
      return
    } else {
      getWalletInfo()
    }
  }, [currentUser])

  useEffect(() => {
    refreshData()
  }, [filterVal])

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  function closeHistoryModal() {
    setIsOpenHistory(false)
  }
  function openHistoryModal() {
    setIsOpenHistory(true)
  }

  function fetchData(page) {
    return Http.getInstance().getWalletTransaction(page, filterVal)
  }

  function getWalletInfo() {
    Http.getInstance()
      .getWalletInfo()
      .then(response => {
        setWalletInfo(response)
      })
      .catch(error => {
        Log.e(error)
      })
  }

  if (!walletInfo) {
    return NormalLayoutComponent(<LoadingCompontent />, pageModel)
  }

  if (!data?.length) {
    return <EmptyComponent />
  }

  function content(props) {
    return (
      <>
        <div className="container mx-auto">
          <div className="wallet">
            <div className="base-info">
              <div className="info">
                <div className="bread">
                  <Link href="/">{t('HOME')}</Link> /{' '}
                  <Link href="/wallet">
                    <a className="active">{t('WALLET')}</a>
                  </Link>
                </div>
                <div className="title">
                  <h2>
                    <>{t('WALLET')}</>
                    <img onClick={openModal} src="/assets/image/icon_wallet_tip.png" alt="wallet tip" />
                  </h2>
                </div>
                <div className="balance">
                  <p className="label">{t('TOTAL_BALANCE')}</p>
                  <p className="value">{walletInfo?.balance} NEW</p>
                </div>
                <div className="balance-info">
                  <p className="label">{t('AVAILABKE')}</p>
                  <p className="value">{walletInfo?.available_balance} NEW</p>

                  <p className="label mt-2">{t('FROZEN')}</p>
                  <p className="value">{walletInfo?.lock_balance} NEW</p>
                </div>
                <div className="action">
                  <Link href="/deposit">
                    <div>
                      <img src="/assets/image/icon_deposit.png" alt="deposit" />
                      <p>
                        <>{t('DEPOSIT')}</>
                      </p>
                    </div>
                  </Link>
                  <Link href="/withdraw">
                    <div>
                      <img src="/assets/image/icon_withdraw.png" alt="deposit" />
                      <p>
                        <>{t('WITHDRAW')}</>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="transaction">
              <h2 className="title">
                <span>{t('TRANSACTION_HISTORY')}</span>
                <img onClick={openHistoryModal} src="/assets/image/icon_screening.png" alt="screening" />
              </h2>
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
            </div>
          </div>
        </div>
        {/* wallet tip */}
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <WalletReminderDialog />
        </DialogComponent>

        {/* history */}
        <DialogComponent isOpen={isOpenHistory} closeModal={closeHistoryModal}>
          <WalletHistoryDialog
            filterVal={filterVal}
            setFilterVal={setFilterVal}
            refreshData={refreshData}
            closeModal={closeHistoryModal}
          />
        </DialogComponent>
      </>
    )
  }

  return NormalLayoutComponent(content(props), pageModel)
}
