import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useWallet from 'hooks/userWallet'
import { PageModel } from 'model/navModel'
import { WalletAccount } from 'model/wallet'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import DialogComponent from 'components/common/DialogComponent'
import PasswordDialog from 'components/dialog/PasswordDialog'
import Http from 'services/http'
import Log from 'utils/log'
import NormalLayoutComponent from 'components/layout/NormalLayoutComponent'
import { useTranslation } from 'react-i18next'
import LoadingCompontent from 'components/layout/LoadingCompontent'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'store/store'
import { UserInfo } from 'model/user'
import { selectUser, updateUserInfo } from 'reducer/userReducer'
import PaymentPasswordDialog from 'components/dialog/PaymentPasswordDialog'

export default function Withdraw() {
  let pageModel = new PageModel('Withdraw', 'WAVE', '')
  const { t } = useTranslation()
  const wallet = useWallet()
  const [walletAccount, setWalletAccount] = useState<WalletAccount>()
  const currentUser = useAppSelector<UserInfo>(selectUser)

  const router = useRouter()

  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [isAmount, setIsAmount] = useState(false)
  const [isAddress, setIsAddress] = useState(false)

  const [isPassError, setIsPassError] = useState(false)

  // payment dialog
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [isPassord, setIsPassword] = useState(false)

  function paymentCloseModal() {
    setIsPaymentOpen(false)
    setIsCode(false)
    setIsPassword(false)
    setEmailCode('')
    setPassword('')
    setConfirmPassword('')
  }

  function paymentOpenModal() {
    setIsPaymentOpen(true)
  }

  function requestUpdatePassword() {
    if (emailCode == '') {
      return setIsCode(true)
    }
    if (password != confirmPassword || password == '' || confirmPassword == '') {
      return setIsPassword(true)
    }
    setConfirmLoading(true)
    Http.getInstance()
      .requestUpdatePassword(emailCode, password)
      .then(response => {
        Log.d(response)
        paymentCloseModal()
        let newUser = {
          ...currentUser,
        }
        newUser.payment_password_set = 1
        dispatch(updateUserInfo(newUser))
        setIsCode(false)
        setIsPassword(false)
      })
      .catch(error => {
        Log.e(error)
        setIsCode(false)
        setIsPassword(false)
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  function closePasswordModal() {
    setIsPasswordOpen(false)
    setIsAmount(false)
    setIsAddress(false)
    setIsPassError(false)
  }

  function onConfirm() {
    if (address == '' || amount == '' || parseInt(amount) < 100) {
      setIsAddress(true)
      setIsAmount(true)
      return
    }

    if (currentUser) {
      if (currentUser.payment_password_set == 1) {
        setIsPasswordOpen(true)
      } else {
        setIsPaymentOpen(true)
      }
    }
  }

  function onAddress(e) {
    setAddress(e.target.value)
  }

  function onAmount(e) {
    setAmount(e.target.value)
  }

  function onConfirmPassword(value) {
    setIsAmount(false)
    setIsAddress(false)

    Http.getInstance()
      .getWalletWithdraw(amount, value, address)
      .then(response => {
        router.push('wallet')
        closePasswordModal()
      })
      .catch(error => {
        Log.e(error)
        setIsPassError(true)
      })
    setIsPassError(false)
  }

  useEffect(() => {
    if (wallet) {
      setWalletAccount(wallet.wallet_accounts[0])
    }
  }, [wallet])

  if (!walletAccount) {
    return NormalLayoutComponent(<LoadingCompontent />, pageModel)
  }

  function content() {
    return (
      <div className="container mx-auto">
        <div className="withdraw">
          <div className="bread">
            <Link href="/">{t('HOME')}</Link> / <Link href="/wallet">{t('WALLET')}</Link> /{' '}
            <Link href="/withdraw">
              <a className="active">{t('WITHDRAW')}</a>
            </Link>
          </div>
          <h2 className="title">{t('WITHDRAW')}</h2>
          <div className="token">
            <p className="mr-3">{t('TOKEN')}:</p>
            <img className="mr-1" src="/assets/image/icon_newton.png" alt="" />
            <p>NEW</p>
            <p className="label">{walletAccount.label}</p>
          </div>

          <div className="from-box">
            <div className="from-content">
              <label htmlFor="text" className="label">
                {t('WITHDRAW_NETWORK')}
              </label>
              <div>
                <Listbox value={walletAccount} onChange={setWalletAccount}>
                  <div>
                    <Listbox.Button className="mt-3 h-14 w-full rounded-xl border-2 border-grayed bg-grayee pl-4">
                      <span className="float-left block truncate">{walletAccount.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex w-6 items-center pr-2 pt-2">
                        <img src="/assets/image/icon_change.png" className="mr-2 h-5 w-5 text-gray-400" alt="" />
                      </span>
                    </Listbox.Button>
                  </div>
                  <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
            </div>
            <div className="from-content">
              <label htmlFor="text" className="label">
                {t('WITHDRAW_ADDRESS')}
              </label>
              <input placeholder={t('ENTER_ADDRESS')} onChange={onAddress} />
              {isAddress ? <p className="address-tit">{t('THIS_ADDRESS')}</p> : null}
            </div>
          </div>

          <div className="from-box">
            <div className="from-content">
              <label htmlFor="text" className="label">
                <span>{t('AMOUNT')}</span>
                <span className="label-right">
                  {t('AVAILABKE')} {wallet.available_balance}NEW
                </span>
              </label>
              <input placeholder={`${t('MINIMUN')}${walletAccount.withdraw_minimum}`} onChange={onAmount} />
              {isAmount ? <p className="address-tit">{t('INSUFFICIENT_BALANCE')}</p> : null}
            </div>
          </div>

          <div className="fee-box">
            <p className="label">{t('FEE')}</p>
            <p className="value">{walletAccount.withdraw_fee}NEW</p>
          </div>

          <div className="tips">
            <p className="tips_title">{t('REMINDER')}</p>
            <p>* {t('WAVE_ACCOUNT')}</p>
            <p>* {t('BEWARE_OF_FRAUD')}</p>
            <p>* {t('INTERNAL_FREE')}</p>
          </div>

          <div className="from-box">
            <button className="primary black" onClick={onConfirm}>
              {t('CONFIRM')}
            </button>
          </div>
        </div>

        <DialogComponent isOpen={isPasswordOpen} closeModal={closePasswordModal}>
          <PasswordDialog
            onCancel={() => closePasswordModal()}
            onConfirm={onConfirmPassword}
            isPassError={isPassError}
          />
        </DialogComponent>

        {/* payment dialog */}
        <DialogComponent isOpen={isPaymentOpen} closeModal={paymentCloseModal}>
          <PaymentPasswordDialog
            setEmailCode={setEmailCode}
            isCode={isCode}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            isPassord={isPassord}
            confirmLoading={confirmLoading}
            requestUpdatePassword={requestUpdatePassword}
          />
        </DialogComponent>
      </div>
    )
  }

  return NormalLayoutComponent(content(), pageModel)
}
