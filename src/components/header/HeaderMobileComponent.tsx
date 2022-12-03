/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-12-03 23:43:18
 * @FilePath: /wave-app-webiste/src/components/header/HeaderMobileComponent.tsx
 */
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Dialog, Transition } from '@headlessui/react'
import { languageTitle } from 'constants/key'
import LoginComponent from './LoginComponent'
import DialogComponent from 'components/common/DialogComponent'
import LoginDialog from 'components/dialog/LoginDialog'

export default function HeaderMobileComponent(props) {
  let { i18n } = useTranslation()
  const { t } = useTranslation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const SiteNavMenu = props => {
    const [isOpen, setIsOpen] = useState(false)
    function closeModal() {
      setIsOpen(false)
    }

    function openModal() {
      setIsOpen(true)
      console.log('99999')
    }
    return (
      // no loading
      <>
        <div className="item" onClick={() => setMobileSidebarOpen(false)}>
          <div className="item-list">
            <Link href="/trade">
              <a className="trade-info">
                <p>
                  <img src="/assets/image/icon_trade.png" alt="trade" />
                  <span>
                    <>{t('TRADE')}</>
                  </span>
                </p>
                <img src="/assets/image/icon_header_arrow.png" alt="arrow" />
              </a>
            </Link>
          </div>
          <div className="item-list">
            <div className="list-language">
              <p>
                <img src="/assets/image/icon_language.png" alt="language" />
                {t('LANGUAGE')}
              </p>
              <p>
                <span className="language">{i18n.language == 'en' ? 'en' : 'zh'}</span>
                <img src="/assets/image/icon_header_arrow.png" alt="arrow" />
              </p>
            </div>
            <div className="language-item">
              {languageTitle.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => {
                      i18n.changeLanguage(item.language)
                    }}
                    className={i18n.language == item.language ? 'active' : ''}
                  >
                    {item.title}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
        <div onClick={openModal} className="login">
          <span>{t('LOGIMN_SIGN_UP')}</span>
        </div>
        {/* login */}
        <DialogComponent isOpen={isOpen} closeModal={closeModal}>
          <LoginDialog closeModal={closeModal} />
        </DialogComponent>
      </>
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
          className="fixed inset-0 z-10 flex lg:hidden"
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
                {/* <div onClick={() => setMobileSidebarOpen(false)}>
                  <SiteNavMenu />
                </div> */}
                <SiteNavMenu />
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
