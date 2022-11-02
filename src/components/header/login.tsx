import { Dialog, Transition } from '@headlessui/react'
import { Form, Input, Button, Row, Col, Checkbox } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, Fragment } from 'react'
import Http from 'services/http'
import { useAppDispatch, useAppSelector } from 'store/store'
import { fetchUser, selectUser, updateUserInfo } from '../../reducer/userReducer'

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
        if (response.error_code == 1) {
          dispatch(updateUserInfo(response.result))
          closeModal()
        } else {
          console.log('login error' + response.error_message)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <li className="login" onClick={openModal}>
        <span>Log In/Sign Up</span>
      </li>
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
