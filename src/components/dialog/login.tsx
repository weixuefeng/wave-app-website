import { Menu } from '@headlessui/react'
import DialogComponent from 'components/common/DialogComponent'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/store'
import { splitAddress } from 'utils/functions'
import { selectUser, updateUserInfo } from '../../reducer/userReducer'
import LoginComponent from './LoginComponent'

export default function Login() {
  let [isOpen, setIsOpen] = useState(false)
  const currentUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

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
              <Link href="/tickets">Tickets</Link>
              <Link href="/wallet">Wallet</Link>
              <Link href="/assets">Assets</Link>
              <Link href="/cinema">Cinema</Link>
              <Link href="/settings" className="mt-4">
                Settings
              </Link>
              <p
                className="w-full cursor-pointer text-red-500"
                onClick={() => {
                  dispatch(updateUserInfo(null))
                  localStorage.clear()
                }}
              >
                Log Out
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
        <LoginComponent closeModal={closeModal} />
      </DialogComponent>
    </>
  )
}
