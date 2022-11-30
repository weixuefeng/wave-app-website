/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-16 18:32:00
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-30 21:26:25
 * @FilePath: /wave-app-webiste/src/pages/wallet.tsx
 */
import DialogComponent from 'components/common/DialogComponent'
import WalletReminderDialog from 'components/dialog/WalletReminderDialog'
import LoadingCompontent from 'components/layout/LoadingCompontent'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import { TransactionList } from 'components/wallet/TransactionList'
import { PageModel } from 'model/navModel'
import { WalletInfo } from 'model/wallet'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import Log from 'utils/log'

export default function Wallet() {
  let pageModel = new PageModel('Wallet', 'WAVE', '')
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser)
  const [walletInfo, setWalletInfo] = useState<WalletInfo>()
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
    return NormalLayoutComponent(<LoadingCompontent />, pageModel)
  }

  function content() {
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
              <h2>
                <>{t('TRANSACTION_HISTORY')}</>
              </h2>
              <TransactionList />
            </div>
          </div>
        </div>
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <WalletReminderDialog />
        </DialogComponent>
      </>
    )
  }

  return NormalLayoutComponent(content(), pageModel)
}
