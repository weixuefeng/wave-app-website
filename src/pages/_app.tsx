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
