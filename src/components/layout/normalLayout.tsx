/*
 * @Author: liukeke liukeke@diynova.com
 * @Date: 2022-10-13 11:34:40
 * @LastEditors: liukeke liukeke@diynova.com
 * @LastEditTime: 2022-10-13 11:37:18
 * @FilePath: /nextjs-starter-boilerplate/src/components/layout/normalLayout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import Head from 'next/head'
import Header from '../header/header'
import Footer from '../footer/footer'
import { PageModel } from 'model/navModel'

export default function NormalLayout(children: React.ReactNode, pageModel: PageModel = null): JSX.Element {
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
