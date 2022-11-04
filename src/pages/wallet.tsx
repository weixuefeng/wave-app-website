import NormalLayout from 'components/layout/normalLayout'
import { TransactionList } from 'components/wallet/TransactionList'
import { PageModel } from 'model/navModel'
import { WalletInfo } from 'model/wallet'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'

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
        console.log(error)
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
              <p>Total Balance</p>
              <p>{walletInfo.balance} NEW</p>
            </div>
            <div className="balance-info">
              <p className="label">Available</p>
              <p className="value">{walletInfo.available_balance} NEW</p>

              <p className="label mt-2">Frozen</p>
              <p className="value">{walletInfo.lock_balance} NEW</p>
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
