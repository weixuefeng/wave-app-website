/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-08 16:10:11
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-08 16:14:35
 * @FilePath: /wave-app-webiste/src/components/dialog/MyoffersAcceDialog.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

export default function MyoffersAcceDialog(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <div className="acce" onClick={openModal}>
        Acce
      </div>
      <div className="acce-modal">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-center">
                      <img className="h-auto w-48" src="/assets/image/icon_done.png" alt="done" />
                    </div>
                    <Dialog.Title as="h3" className=" mt-7 mb-5 text-center text-2xl font-normal text-gray333">
                      Sold Successfully
                    </Dialog.Title>
                    <div className="text-center leading-6 text-gray66">
                      The obtained NEW has been transfered to your wallet,you can check it in
                      &quot;Me&quot;-&quot;Wallet&quot;
                    </div>

                    <div className="flex justify-center">
                      <Link href="/wallet">
                        <button
                          type="button"
                          className="mt-10 rounded-lg bg-gray333 py-3 px-16 text-center text-white"
                          onClick={closeModal}
                        >
                          Check Balance
                        </button>
                      </Link>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  )
}
