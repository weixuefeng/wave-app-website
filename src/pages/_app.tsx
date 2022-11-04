/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-04 19:29:55
 * @FilePath: /wave-app-website/src/pages/_app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import 'i18n'
import { useRouter } from 'next/router'
import HeadGlobal from 'components/HeadGlobal'
import { Provider } from 'react-redux'
import store, { useAppDispatch } from '../store/store'
import { useEffect } from 'react'
import { getLocalData } from 'localstorage/localstorage'
import { LocalKey } from 'constants/key'
import { UserInfo } from 'model/user'
import { updateUserInfo, updateWalletInfo } from 'reducer/userReducer'
import { WalletInfo } from 'model/wallet'

function InitComponent() {
  const dispatch = useAppDispatch()

  function initUser() {
    // get user
    const userInfo = getLocalData(LocalKey.USER, '')
    let user
    if (userInfo && userInfo) {
      user = JSON.parse(userInfo) as UserInfo
      dispatch(updateUserInfo(user))
      initWallet()
    }
  }

  async function initWallet() {
    const walletInfo = getLocalData(LocalKey.WALLET, '')
    let wallet
    if (walletInfo && walletInfo) {
      wallet = JSON.parse(walletInfo) as WalletInfo
      dispatch(updateWalletInfo(wallet))
    }
  }

  useEffect(() => {
    initUser()
  }, [])
  return <></>
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <HeadGlobal />
      <Provider store={store}>
        <InitComponent />
        <Component key={router.asPath} {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}
export default MyApp
