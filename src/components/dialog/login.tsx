import { Dialog, Menu, Transition } from '@headlessui/react'
import { Checkbox } from 'antd'
import { LocalKey } from 'constants/key'
import { putLocalData } from 'localstorage/localstorage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, Fragment } from 'react'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import { splitAddress } from 'utils/functions'
import { selectUser, updateUserInfo } from '../../reducer/userReducer'

export default function Login() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [email, setEmail] = useState<string>()
  const [verifyCode, setVerifyCode] = useState<string>()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser)
  const router = useRouter()

  function requestVerifyCode() {
    Http.getInstance()
      .requestVerifyCode(email)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function requestLogin() {
    Http.getInstance()
      .login(email, verifyCode)
      .then(response => {
        putLocalData(LocalKey.USER, JSON.stringify(response))
        dispatch(updateUserInfo(response))
        closeModal()
      })
      .catch(error => {
        console.log(error)
      })
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
        <Menu.Items as={"div"} className="user-menu">
          <div>
            <img src={currentUser.avatar} alt="avatar"/>
            <p className="name">{currentUser.name}</p>
            <p className="address">{splitAddress(currentUser.wallet_address)}</p>
            <div className="list">
              <a href="/tickets">Tickets</a>
              <a href="/wallet">Wallet</a>
              <a href="/assets">Assets</a>
              <a href="/cinema">Cinema</a>
              <a href="/settings" className="mt-4">Settings</a>
              <a className="text-red-500">Log Out</a>
            </div>
          </div>
        </Menu.Items>
      </Menu>
    )
  }

  function userComponent() {
    return <li className='relative'>{userMenu()}</li>
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="dialog-box">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog">
                  <div className="title">
                    <h3> Log In / Sign Up</h3>
                    <div className="closed" onClick={closeModal}>
                      <img src="/assets/image/icon_closed.png" alt="closed" />
                    </div>
                  </div>
                  <div className={'password-box'}>
                    <div className="email">
                      <input placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                      <img src="assets/image/icon_email.png" alt="email" />
                    </div>

                    <div className="code-box">
                      <input placeholder="Verification Code" onChange={e => setVerifyCode(e.target.value)} />
                      <img src="assets/image/icon_code.png" alt="code" />
                      <button onClick={() => requestVerifyCode()} className="send-code">
                        <span>Send code</span>
                      </button>
                    </div>

                    <button
                      onClick={() => requestLogin()}
                      className="inline-flex w-full justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      <span>Log in</span>
                    </button>

                    <div className="agree-box">
                      <Checkbox className="checkbox"></Checkbox>
                      <p className="agree">
                        I agree to WAVE&apos;s <Link href="/b">Terms of Service</Link> and{' '}
                        <Link href="/a">Privacy Policy</Link>
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
