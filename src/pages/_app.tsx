/*
 * @Author: zhuxiaotong zhuxiaotong@diynova.com
 * @Date: 2022-10-24 11:54:01
 * @LastEditors: weixuefeng weixuefeng@diynova.com
 * @LastEditTime: 2022-11-03 19:14:19
 * @FilePath: /wave-app-webiste/src/pages/_app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import 'i18n'
import { useRouter } from 'next/router'
import HeadGlobal from 'components/HeadGlobal'
import { Provider } from 'react-redux'
import store from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <HeadGlobal />
      <Provider store={store}>
        <Component key={router.asPath} {...pageProps} />
      </Provider>
    </ThemeProvider>
  )
}
export default MyApp
