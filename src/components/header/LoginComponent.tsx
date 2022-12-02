/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-21 11:55:31
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-02 20:37:34
 * @FilePath: /wave-app-webiste/src/components/header/LoginComponent.tsx
 */
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
        <span>
          <>{t('LOGIMN_SIGN_UP')}</>
        </span>
      </li>
    )
  }

  function imgSrc() {
    return <img src={currentUser.avatar == '' ? '/assets/image/icon_avata.png' : currentUser.avatar} alt="avatar" />
  }

  function userMenu() {
    return (
      <Menu>
        <Menu.Button>
          <div className="portrait">
            {imgSrc()}
            <p>{currentUser.name}</p>
          </div>
        </Menu.Button>
        <Menu.Items as={'div'} className="user-menu">
          <div>
            {imgSrc()}
            <p className="name">{currentUser.name}</p>
            <p className="address">{splitAddress(currentUser.wallet_address)}</p>
            <div className="list">
              <div className="page">
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
              </div>
              <div className="settings">
                <Link href="/settings" className="mt-4">
                  <p className="settings-itme">{t('SETTINGS')}</p>
                </Link>
                <p
                  className="login-out"
                  onClick={() => {
                    dispatch(updateUserInfo(null))
                    localStorage.clear()
                  }}
                >
                  {t('LOGOUT')}
                </p>
              </div>
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
