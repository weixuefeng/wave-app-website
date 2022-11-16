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
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'


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
            <p className="mr-3">Token:</p>
            <img className="mr-1" src="/assets/image/icon_newton.png" alt="" />
            <p>NEW</p>
            <p className="label">{walletAccount.label}</p>
          </div>

          <div className="select">
            <p>Deposit Network</p>
            <p className="content">Select deposit network to show deposit address</p>
          </div>
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
                  dark: '#000',
                  light: '#F8F8F8',
                },
              }}
            />
            <div className="content">
              <p className="content_title">Deposit Address</p>
              <p className="content_tips">Scan the QR code to get the deposit address</p>
              <p className="address">
                {walletAccount.wallet_address}
                <ClipboardDocumentIcon onClick={() => copyContent(walletAccount.wallet_address)} />
              </p>
            </div>
          </div>

          <div className="tip">
            <p className="tip_title">Reminder</p>
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
