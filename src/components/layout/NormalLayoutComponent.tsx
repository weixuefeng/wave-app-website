/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:34:40
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-11-24 16:15:44
 * @FilePath: /wave-app-webiste/src/components/layout/NormalLayoutComponent.tsx
 */
import React from 'react'
import Head from 'next/head'
import Header from '../header/header'
import Footer from '../footer/footer'
import { PageModel } from 'model/navModel'

export default function NormalLayoutComponent(children: React.ReactNode, pageModel: PageModel = null): JSX.Element {
  return (
    <>
      <Head>
        <title>{pageModel?.title}</title>
        <meta name="description" content={pageModel?.description} />
        <meta name="keywords" content="newtonproject" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <div className={pageModel.name}>
        <Footer />
      </div>
    </>
  )
}
