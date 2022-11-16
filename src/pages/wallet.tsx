import NormalLayout from 'components/layout/normalLayout'
import { TransactionList } from 'components/wallet/TransactionList'
import { PageModel } from 'model/navModel'
import { WalletInfo } from 'model/wallet'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function Wallet() {
  let pageModel = new PageModel('Wallet', 'WAVE', '')

  const currentUser = useAppSelector(selectUser)

  const [walletInfo, setWalletInfo] = useState<WalletInfo>()

  useEffect(() => {
    if (!currentUser) {
      return
    } else {
      getWalletInfo()
    }
  }, [currentUser])

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
    return <>no wallet</>
  }

  function content() {
    return (
      <div className="container mx-auto">
        <div className="wallet">
          <div className="base-info">
            <div className="title">
              <h2>My Wallet</h2>
            </div>
            <div className="balance">
              <p className="label">Total Balance</p>
              <p className="value">{walletInfo.balance} NEW</p>
            </div>
            <div className="balance-info">
              <p className="label">Available</p>
              <p className="value">{walletInfo.available_balance} NEW</p>

              <p className="label mt-2">Frozen</p>
              <p className="value">{walletInfo.lock_balance} NEW</p>
            </div>
            <div className="action">
              <Link href="/deposit">
                <div>
                  <img src="/assets/image/icon_deposit.png" alt="deposit" />
                  <p>Deposit</p>
                </div>
              </Link>
              <Link href="/withdraw">
                <div>
                  <img src="/assets/image/icon_withdraw.png" alt="deposit" />
                  <p>Withdraw</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="transaction">
            <h2>Transaction History</h2>
            <TransactionList />
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
