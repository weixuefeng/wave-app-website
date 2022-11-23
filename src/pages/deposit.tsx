import { Listbox } from '@headlessui/react'
import NormalLayout from 'components/layout/NormalLayout'
import useWallet from 'hooks/userWallet'
import { PageModel } from 'model/navModel'
import { WalletAccount } from 'model/wallet'
import { useQRCode } from 'next-qrcode'
import React, { useEffect, useState } from 'react'
import copyContent from 'utils/functions'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

export default function Deposit() {
  const { t } = useTranslation()
  let pageModel = new PageModel('Deposit', 'WAVE', '')

  const wallet = useWallet()
  const { Canvas } = useQRCode()

  const [walletAccount, setWalletAccount] = useState<WalletAccount>()
  const [isShowToast, setIsShowToast] = useState(false)

  useEffect(() => {
    if (wallet) {
      setWalletAccount(wallet.wallet_accounts[0])
    }
  }, [wallet])

  if (!walletAccount) {
    return <></>
  }

  async function copyAddress(content) {
    await copyContent(content)
    setIsShowToast(true)
    setTimeout(() => {
      setIsShowToast(false)
    }, 3000)
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

          <div className="w-72">
            <Listbox value={walletAccount} onChange={setWalletAccount}>
              <div className="relative">
                <Listbox.Button className="mt-3 h-14 w-full rounded-xl border-2 border-grayed bg-grayee">
                  <span className="block w-24 truncate">{walletAccount.label}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 pt-2">
                    <img src="assets/image/icon_change.png" className="mr-2 h-5 w-5 text-gray-400" alt="" />
                  </span>
                </Listbox.Button>
              </div>
              <Listbox.Options className="absolute mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {wallet.wallet_accounts.map((account, index) => (
                  <Listbox.Option
                    key={index}
                    value={account}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {account.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

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
                <ClipboardDocumentIcon onClick={() => copyAddress(walletAccount.wallet_address)} />
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
          {isShowToast && (
            <div className="toast">
              <img className="copied" src="/assets/image/copied.png" alt="copied" />
              <span>{t('COPIED')}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return NormalLayout(content(), pageModel)
}
