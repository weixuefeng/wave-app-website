import React, { useEffect, useState } from 'react'
import NormalLayout from 'components/layout/NormalLayout'
import useWallet from 'hooks/userWallet'
import { PageModel } from 'model/navModel'
import { WalletAccount } from 'model/wallet'

export default function Withdraw() {
  let pageModel = new PageModel('Withdraw', 'WAVE', '')

  const wallet = useWallet()

  const [walletAccount, setWalletAccount] = useState<WalletAccount>()

  useEffect(() => {
    if (wallet) {
      setWalletAccount(wallet.wallet_accounts[0])
    }
  }, [wallet])

  if (!walletAccount) {
    return <></>
  }

  function content() {
    return (
      <div className="container mx-auto">
        <div className="withdraw">
          <p className="title">Withdraw</p>
          <div className="token">
            <p className="mr-3">Token:</p>
            <img className="mr-1" src="/assets/image/icon_newton.png" alt="" />
            <p>NEW</p>
            <p className="label">{walletAccount.label}</p>
          </div>

          <div className="from-box">
            <div className="code-box">
              <label htmlFor="text" className="label">
                Withdrawal Network
              </label>
              <div className="select-box">{walletAccount.label}</div>
              <img src="assets/image/icon_change.png" alt="" />
            </div>
            <div className="code-box">
              <label htmlFor="text" className="label">
                Withdrawal Address
              </label>
              <input placeholder="Enter or paste address" />
            </div>
          </div>

          <div className="from-box" >
            <div className="code-box">
              <label htmlFor="text" className="label">
                Amount
              </label>
              <input placeholder="Minimum0"/>
            </div>
          </div>

          <div className="fee-box">
            <p className="label">Fee</p>
            <p className="value">21NEW</p>
          </div>

          <div className="tips">
            <p className="tips_title">Reminder</p>
            <p>* WAVE will never ask you to transfer funds to another account.</p>
            <p>
              * Beware of fraud and do not participate in illegal activities such as proxy purchases, money
              laundering, and illegal fundraising.
            </p>
            <p>* Internal transfer will be free.</p>
          </div>

          <div className="from-box">
            <button className="primary black">Confirm</button>
          </div>

        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
