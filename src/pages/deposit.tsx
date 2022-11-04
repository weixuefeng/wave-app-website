import { Listbox } from '@headlessui/react'
import NormalLayout from 'components/layout/normalLayout'
import useWallet from 'hooks/userWallet'
import { PageModel } from 'model/navModel'
import { WalletAccount, WalletInfo } from 'model/wallet'
import { useQRCode } from 'next-qrcode'
import React, { useEffect, useState } from 'react'
import { selectUser } from 'reducer/userReducer'
import Http from 'services/http'
import { useAppSelector } from 'store/store'
import copyContent from 'utils/functions'

export default function Deposit() {
  let pageModel = new PageModel('Deposit', 'WAVE', '')

  const wallet = useWallet()
  const { Canvas } = useQRCode()

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
        <div className="deposit">
          <p className="title">Deposit</p>
          <div className="token">
            <p>Token:</p>
            <p>icon: NEW {walletAccount.label}</p>
          </div>

          <p>Deposit Network</p>
          <Listbox value={walletAccount} onChange={setWalletAccount}>
            <Listbox.Button>{walletAccount.label}</Listbox.Button>
            <Listbox.Options>
              {wallet.wallet_accounts.map((account, index) => (
                <Listbox.Option key={index} value={account}>
                  {account.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          <div className="qrcode">
            <Canvas
              text={walletAccount.wallet_address}
              options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'M',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: '#010599FF',
                  light: '#FFBF60FF',
                },
              }}
            />
            <div className="content">
              <p>Deposit Address</p>
              <p>Scan the QR code to get the deposit address</p>
              <p className="address" onClick={() => copyContent(walletAccount.wallet_address)}>
                {walletAccount.wallet_address}
              </p>
            </div>
          </div>

          <div className="tip">
            <p>Reminder</p>
            <p>* If you send any other crypto except NEW to this address, you will lose your assets.</p>
            <p>
              * Min deposit amount {walletAccount.deposit_minimum} {walletAccount.coin_type}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
