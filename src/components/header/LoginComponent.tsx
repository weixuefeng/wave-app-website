import { Menu } from '@headlessui/react'
import DialogComponent from 'components/common/DialogComponent'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'store/store'
import { splitAddress } from 'utils/functions'
import { selectUser, updateUserInfo } from '../../reducer/userReducer'
import LoginDialog from '../dialog/LoginDialog'

export default function LoginComponent() {
  let [isOpen, setIsOpen] = useState(false)
  const currentUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function noUserComponent() {
    return (
      <li className="login" onClick={openModal}>
        <span>Log In / Sign Up</span>
      </li>
    )
  }

  function userMenu() {
    return (
      <Menu>
        <Menu.Button>
          <img className="h-10 w-10 rounded-full" src={currentUser.avatar} alt="avatar" />
        </Menu.Button>
        <Menu.Items as={'div'} className="user-menu">
          <div>
            <img src={currentUser.avatar} alt="avatar" />
            <p className="name">{currentUser.name}</p>
            <p className="address">{splitAddress(currentUser.wallet_address)}</p>
            <div className="list">
              <Link href="/tickets">
                <p>{t('TICKETS')}</p>
              </Link>
              <Link href="/wallet">
                <p>{t('WALLET')}</p>
              </Link>
              <Link href="/assets">
                <p>{t('ASSETS')}</p>
              </Link>
              <Link href="/cinema">
                <p>{t('MY_CINEMA')}</p>
              </Link>
              <Link href="/settings" className="mt-4">
                <p>{t('SETTINGS')}</p>
              </Link>
              <p
                className="w-full cursor-pointer text-red-500"
                onClick={() => {
                  dispatch(updateUserInfo(null))
                  localStorage.clear()
                }}
              >
                {t('LOGOUT')}
              </p>
            </div>
          </div>
        </Menu.Items>
      </Menu>
    )
  }

  function userComponent() {
    return <li className="relative">{userMenu()}</li>
  }

  function getUserComponent() {
    if (!currentUser) {
      return noUserComponent()
    } else {
      return userComponent()
    }
  }

  return (
    <>
      {getUserComponent()}
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        <LoginDialog closeModal={closeModal} />
      </DialogComponent>
    </>
  )
}
