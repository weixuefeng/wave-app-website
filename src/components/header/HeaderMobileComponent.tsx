/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-03 00:32:21
 * @FilePath: /wave-app-webiste/src/components/header/HeaderMobileComponent.tsx
 */
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Dialog, Transition } from '@headlessui/react'

export default function HeaderMobileComponent(props) {
  let { i18n } = useTranslation()
  const { t } = useTranslation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const SiteNavMenu = props => {
    return (
      <div className='item'>
        <div className='item-list'>
          <Link href='/trade'>
            <a>
              <img src="/assets/image/icon_trade.png" alt="trade" />
              <span>{t('TRADE')}</span>
            </a>
          </Link>
        </div>
        <div className='item-list'>
          <p>
            <img src="/assets/image/icon_language.png" alt="language" />
            {t('LANGUAGE')}
          </p>
          <p>zh</p>
        </div>
      </div>
    )
  }

  return (
    <div className="header-mobile-box">
      <div className="header-mobile">
        <div onClick={() => setMobileSidebarOpen(true)} className={'header-menu'}>
          <img src="/assets/image/icon_menu.png" alt="menu" />
        </div>
        <div className="logo">
          <Link href="/" passHref>
            <div>
              <img src="/assets/image/logo.png" alt="Wave" />
            </div>
          </Link>
        </div>
      </div>
      <Transition.Root show={mobileSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex lg:hidden"
          open={mobileSidebarOpen}
          onClose={setMobileSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="overlay" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div id="mobile-sidebar">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 left-0 -mr-16 bg-white pt-5">
                  <button
                    className="ml-6 flex items-center justify-center bg-white bg-opacity-0 focus:outline-none dark:bg-opacity-0"
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <img className="h-5 w-5" src="/assets/image/icon_closed.png" alt="closed" />
                  </button>
                </div>
              </Transition.Child>
              <head className="brand">
                <Link href="/" passHref>
                  <a onClick={() => setMobileSidebarOpen(false)}>
                    <img className="header-logo" src="/assets/image/logo_white.png" alt="weinvent" />
                  </a>
                </Link>
              </head>
              <nav className="mobile-dialog">
                <div onClick={() => setMobileSidebarOpen(false)}>
                  <SiteNavMenu />
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element */}
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
