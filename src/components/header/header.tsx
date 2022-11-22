/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-11-15 12:51:57
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-22 20:15:10
 * @FilePath: /wave-app-webiste/src/components/header/header.tsx
 */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LoginComponent from './LoginComponent'
import { languageTitle } from 'constants/key'

export default function Header(props) {
  
  let { i18n } = useTranslation()
  const { t } = useTranslation()

  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

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

  return (
    <div className="border-b-2 border-solid border-gray-100 bg-white px-4 xl:px-0">
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
            <Link href="/message" passHref>
              <div className="massage-img">
                <img src="/assets/image/icon_massage.png" alt="massage" />
                <i></i>
              </div>
            </Link>
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
  )
}
