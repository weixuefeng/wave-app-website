/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-12-08 20:39:59
 * @FilePath: /wave-app-website/src/components/header/HeaderPcComponent.tsx
 */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LoginComponent from './LoginComponent'
import { languageTitle } from 'constants/key'
import { useAppSelector } from 'store/store'
import { selectUser } from 'reducer/userReducer'
import { UserInfo } from 'model/user'
import DialogComponent from 'components/common/DialogComponent'
import LoginDialog from 'components/dialog/LoginDialog'

export default function HeaderPcComponent(props) {
  let { i18n } = useTranslation()
  const { t } = useTranslation()
  const currentUser = useAppSelector(selectUser) as UserInfo
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    document.addEventListener('click', e => setIsLanguageOpen(false))
  }, [])

  const stopPropagation = e => {
    e.nativeEvent.stopImmediatePropagation()
  }
  const onLanguageItem = e => {
    stopPropagation(e)
    setIsLanguageOpen(!isLanguageOpen)
  }

  function messageLogin() {
    if (currentUser !== undefined) {
      return (
        <Link href="/message" passHref>
          <div className="massage-img">
            <img src="/assets/image/icon_message.png" alt="massage" />
            <i></i>
          </div>
        </Link>
      )
    } else {
      return (
        <div onClick={openModal}>
          <div className="massage-img">
            <img src="/assets/image/icon_message.png" alt="massage" />
            <i></i>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div className="header-pc">
        <div className="header container">
          <div className="logo">
            <Link href="/" passHref>
              <div>
                <img src="/assets/image/logo.png" alt="Wave" />
              </div>
            </Link>
          </div>
          <ul>
            <li className="massage">
              <Link href="/trade" passHref>
                <a>
                  <>{t('TRADE')}</>
                </a>
              </Link>
              {messageLogin()}
            </li>
            <li className="language">
              <div className="language-img" onClick={onLanguageItem}>
                <img src="/assets/image/icon_language.png" alt="language" />
                <div className={`${isLanguageOpen ? 'item block' : 'item hidden'}`}>
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
            </li>
            <LoginComponent />
          </ul>
        </div>
      </div>
      <DialogComponent isOpen={isOpen} closeModal={closeModal}>
        <LoginDialog closeModal={closeModal} />
      </DialogComponent>
    </>
  )
}
